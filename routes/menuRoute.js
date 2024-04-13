const express = require("express");
const MenuItem = require("../models/menuItem");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("menu item is get");
    res.status(200).json(data);
  } catch (error) {
    console.log("menu is not get");
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("menu item is saved");
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == "sweet" || tasteType == "spicy" || tasteType == "sour") {
      const taste = await MenuItem.find({ taste: tasteType });
      console.log("parameterised data is fetch");
      res.status(200).json(taste);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updateId = req.params.id;
    const updateMenu = req.body;
    const response = await MenuItem.findByIdAndUpdate(updateId, updateMenu, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person not Found" });
    }
    console.log("menu is updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(deleteId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("menu item is deleted");
    res.status(200).json({ message: "Data is deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
