const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  provider: { type: String, default: "firebase" },
});

module.exports = mongoose.model("User", userSchema);
