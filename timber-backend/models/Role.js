const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [String], // Optional field for fine-grained access
}, { timestamps: true });

module.exports = mongoose.model("Role", RoleSchema);
