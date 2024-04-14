const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number, // Changed type from String to Number for age
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number, // Changed type from String to Number for salary
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    //hash password is genrated
    const salt = await bcrypt.genSalt(10);

    //hashPassword
    const hashPassword = await bcrypt.hash(person.password, salt);
    person.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

//comapre the password
// Define the method on the schema
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
