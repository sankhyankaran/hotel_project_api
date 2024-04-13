const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Person routes
const personRoute = require("./routes/personRoute");
app.use("/person", personRoute);

// MenuItem routes
const menuRoute = require("./routes/menuRoute");
app.use("/menu", menuRoute);

app.get("/", (req, res) => {
  res.send("Data is Connected to Our Hotel database");
  console.log("Data is connected to server");
});

const PORT = process.env.PORT || 2004;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
