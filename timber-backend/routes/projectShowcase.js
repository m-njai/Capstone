const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const Project = require("../models/ProjectShowcase");

const router = express.Router();

// Setup Multer storage
const storage = multer.diskStorage({
  destination: "./uploads/projects/",
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Create a new showcase project
router.post("/", upload.array("images", 5), async (req, res) => {
  const { title, description, location } = req.body;
  const imagePaths = req.files.map(file => `/uploads/projects/${file.filename}`);

  try {
    const newProject = await Project.create({
      title,
      description,
      location,
      images: imagePaths
    });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to save project" });
  }
});

// Get all showcase projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

module.exports = router;
