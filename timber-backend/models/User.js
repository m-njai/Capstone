const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Optional with Firebase
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  provider: { type: String, default: "local" } // or "firebase"
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
