const mongoose = require("mongoose");

// const mongoUrl = "mongodb://localhost:27017/hotels";
const mongoUrl =
  "mongodb+srv://sankhyankanu44:karan123@cluster0.f3ezkbr.mongodb.net/";

// Connecting to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Server is connected");
});

db.on("error", (error) => {
  console.error("Connection error:", error);
});

db.on("disconnected", () => {
  console.log("Server is disconnected");
});

module.exports = db;
