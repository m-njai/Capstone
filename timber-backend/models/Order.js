// models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
  isFSC: {
    type: Boolean,
    default: false,
  },
  material: String,
  quantity: Number,
  supplierId: String,
  orderDate: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
