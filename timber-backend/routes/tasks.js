// routes/tasks.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  addComment,
  getComments,
  uploadFile,
  getAttachments,
} = require("../controllers/taskController");

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/task_files/",
  filename: (req, file, cb) => cb(null, uuidv4() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Task routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// Comment routes
router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);

// File upload routes
router.post("/:id/upload", upload.single("file"), uploadFile);
router.get("/:id/attachments", getAttachments);

module.exports = router;
