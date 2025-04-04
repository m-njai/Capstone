// routes/projectShowcase.js
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const {
  createProjectShowcase,
  getAllProjects,
} = require("../controllers/projectShowcaseController");

const router = express.Router();

// Setup Multer storage
const storage = multer.diskStorage({
  destination: "./uploads/projects/",
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.array("images", 5), createProjectShowcase);
router.get("/", getAllProjects);

module.exports = router;
