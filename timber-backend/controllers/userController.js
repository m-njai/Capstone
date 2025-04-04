// routes/users.js
const express = require("express");
const multer = require("multer");
const {
  getUser,
  updateUser,
  updatePreferences,
  uploadAvatar,
  changePassword
} = require("../controllers/userController");

const router = express.Router();

// Avatar Upload Setup
const storage = multer.diskStorage({
  destination: "./uploads/avatars/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Routes
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.put("/:id/preferences", updatePreferences);
router.post("/:id/avatar", upload.single("avatar"), uploadAvatar);
router.put("/:id/change-password", changePassword);

module.exports = router;
