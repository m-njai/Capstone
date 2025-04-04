// controllers/inventoryController.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  category: String,
  name: String,
  quantity: Number,
  unit: String,
});

const Item = mongoose.model("Item", ItemSchema);

const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ inventory: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).send("Item deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
