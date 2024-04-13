const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 2004;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} Request made to: ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);
//Person routes
const personRoute = require("./routes/personRoute");
app.use("/person", personRoute);

// MenuItem routes
const menuRoute = require("./routes/menuRoute");
app.use("/menu", menuRoute);

app.get("/", (req, res) => {
  res.send("Data is Connected to Our Hotel database");
  console.log("Data is connected to server");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
