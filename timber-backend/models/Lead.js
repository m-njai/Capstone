const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", LeadSchema);
