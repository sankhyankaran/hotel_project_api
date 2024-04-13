const express = require("express");
const app = express();
const db = require("./db"); // Assuming this file handles database connection

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//person routes
const personRoute = require("./routes/personRoute");
app.use("/person", personRoute);

//menuItem routes
const menuRoute = require("./routes/menuRoute");
app.use("/menu", menuRoute);

app.get("/", (req, res) => {
  res.send("Data is Connected to Our Hotel database");
  console.log("Data is connected to server");
});

const PORT = 2004;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
