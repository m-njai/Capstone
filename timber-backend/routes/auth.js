const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/authFirebase");
const User = require("../models/User");

// ✅ Register a new Firebase-authenticated user
router.post("/register", verifyFirebaseToken, async (req, res) => {
  const { name, email, roleId } = req.body;

  if (!name || !email || !roleId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      roleId,
      provider: "firebase",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.roleId,
        provider: newUser.provider,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
});

// ✅ Login for Firebase-authenticated user
router.post("/login", verifyFirebaseToken, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).populate("roleId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Login success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.roleId?.name || "unknown",
        provider: user.provider,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

module.exports = router;
