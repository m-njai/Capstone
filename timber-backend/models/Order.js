const mongoose = require("mongoose");

// Define Order schema for MongoDB
const OrderSchema = new mongoose.Schema(
  {
    supplier_id: { type: String, required: true },
    timber_type: { type: String, required: true },
    quantity: { type: Number, required: true },
    expected_delivery: { type: Date, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Order", OrderSchema);
