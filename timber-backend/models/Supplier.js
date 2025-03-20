const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true }
});

module.exports = mongoose.model("Supplier", SupplierSchema);
