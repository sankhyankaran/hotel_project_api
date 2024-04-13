// const add = function (a, b, callback) {
//   var result = a + b;
//   console.log("result is", result);
//   callback();
// };

// function callback() {
//   console.log("This callback function is completed");
// }

// add(22, 44, callback);

// const add = (a, b, callback) => {
//   var result = a + b;
//   console.log("result", result);
//   callback();
// };

// const callback = () => {
//   console.log("This is callback function");
// };

// add(22, 44, callback);

// const os = require("os");
// const fs = require("fs");

// const user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile("greeting.txt", "Hi" + user.username + "!\n", () => {
//   console.log("file is created");
// });

// console.log(os);
// console.log(fs);

// const _ = require("lodash");

// var data = ["person", "person", 1, 2, 3, 1, 2, "name", "age"];

// var filter = _.uniq(data);
// console.log(filter);

// const express = require("express");

// const server = express();

// const PORT = 2001;

// server.get("/", (req, res) => {
//   console.log("Data is created");
//   res.send("Data is created");
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}/`);
// });

// const obj = { name: "John", age: 30, city: "New York" };

// const myJSON = JSON.stringify(obj);

// console.log(myJSON);

// myJSON = '{"name":"John", "age":30, "car":null}';
// myObj = JSON.parse(myJSON);

// console.log(myObj);
