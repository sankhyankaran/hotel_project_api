const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Corrected 'res.body' to 'req.body'
    const newPerson = new Person(data);
    const response = await newPerson.save();

    //payload
    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));

    //genrate token
    const token = generateToken(payload);
    console.log("Token is ready", token);

    console.log("data is saved");
    res.status(201).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    //extract username and password from body
    const { username, password } = req.body;
    //find the user by username
    const user = await Person.findOne({ username: username });
    //if user does not exist or password does not match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username and password" });
    }

    //genrate token
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    //return token in resoponse
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//profile check router
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data", userData);

    const userId = userData.id;
    const user = await Person.findOne({ _id: userId });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data is Get");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const respone = await Person.find({ work: workType });
      console.log("person data is fetch");
      res.status(200).json(respone);
    } else {
      res.status(404).json({ error: "Invalid workType" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePerson = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatePerson, {
      new: true, //return the update document
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Person is updated");
    res.status(202).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;
    const respone = await Person.findByIdAndDelete(deleteId);
    if (!respone) {
      return res.status(404).json({ error: "Person not Found" });
    }
    console.log("Person is updated");
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
