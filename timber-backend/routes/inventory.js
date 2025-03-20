
const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Get all inventory items
router.get("/", async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json({ inventory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new inventory item
router.post("/add", async (req, res) => {
    try {
        const { timber_type, stock, reorder_threshold } = req.body;
        const newItem = new Inventory({ timber_type, stock, reorder_threshold });
        await newItem.save();
        res.json({ message: "Inventory item added", item: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update inventory stock
router.post("/update", async (req, res) => {
    try {
        const { id, new_stock } = req.body;
        const updatedItem = await Inventory.findByIdAndUpdate(id, { stock: new_stock }, { new: true });
        res.json({ message: "Inventory updated", item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
