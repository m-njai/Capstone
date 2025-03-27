const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, enum: ["Admin", "Project Manager", "Builder"], default: "Builder" },
  password: { type: String, required: true }, // Password field for secure login
  avatar: { type: String, default: "" }, // Avatar field for profile pictures
  notificationPrefs: { // Notification preferences
    emailAlerts: { type: Boolean, default: true },
    smsAlerts: { type: Boolean, default: false }
  },
  theme: { type: String, enum: ["light", "dark"], default: "light" }, // Theme selection
  twoFactorEnabled: { type: Boolean, default: false }, // Two-factor authentication
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving the user document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if the password isn't changed
  this.password = await bcrypt.hash(this.password, 10); // Hash password with salt rounds
  next();
});

module.exports = mongoose.model("User", UserSchema);
