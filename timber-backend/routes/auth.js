const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/authFirebase");
const User = require("../models/User");

// Register new Firebase-authenticated user
router.post("/register", verifyFirebaseToken, async (req, res) => {
  const { name, email, password, roleId } = req.body;

  if (!name || !email || !password || !roleId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = new User({
    name,
    email,
    password, // or use hashedPassword if storing securely
    roleId,
    provider: "firebase"
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully", user: newUser });
});

// Login for Firebase-authenticated user
router.post("/login", verifyFirebaseToken, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).populate('roleId');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Login success",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.roleId.name,
        provider: user.provider
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

module.exports = router;
