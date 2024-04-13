const mongoose = require("mongoose");
require("dotenv").config();

// const mongoUrl = process.env.LOCAL_MONGODB_URL;
const mongoUrl = process.env.MONGODB_URL;

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
