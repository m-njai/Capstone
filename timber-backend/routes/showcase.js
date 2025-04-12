const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup upload directory
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
});

const upload = multer({ storage });

// POST /api/showcase — Upload multiple project images + metadata
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { title, description, location, featured, tags } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Build project object
    const project = {
      title,
      description,
      location,
      featured: featured === "true",
      tags: Array.isArray(tags) ? tags : [tags],
      images: req.files.map((file) => `/uploads/${file.filename}`),
      uploadedAt: new Date(),
    };

    console.log("✅ Uploaded Project:", project);
    res.status(201).json({ message: "Project uploaded", project });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
});

module.exports = router;
