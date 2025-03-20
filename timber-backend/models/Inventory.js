const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    timber_type: { type: String, required: true },
    stock: { type: Number, required: true },
    reorder_threshold: { type: Number, required: true }
});

module.exports = mongoose.model("Inventory", InventorySchema);
