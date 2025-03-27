const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.put("/:id/preferences", async (req, res) => {
    try {
      const { notificationPrefs, theme, twoFactorEnabled } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { notificationPrefs, theme, twoFactorEnabled },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });
  
// Get a user profile by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-__v");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a user profile by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Avatar upload route
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/avatars/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post("/:id/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const filePath = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.params.id, { avatar: filePath }, { new: true });
    res.json({ message: "Avatar updated", avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ error: "Failed to upload avatar" });
  }
});

// Password Change Endpoint
router.put("/:id/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 10); // Securely hash the new password
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password" });
  }
});

module.exports = router;
