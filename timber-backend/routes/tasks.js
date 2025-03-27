const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const router = express.Router();

// In-memory data
let tasks = [];
let comments = [];
let attachments = [];

// Set up file storage for task attachments
const storage = multer.diskStorage({
  destination: "./uploads/task_files/",
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ----------------------------
// Routes for Tasks

// Create a task
router.post("/", (req, res) => {
  const { title, description, dueDate, assignee, status = "Todo", projectId } = req.body;
  if (!title || !description || !assignee) {
    return res.status(400).json({ error: "Title, description, and assignee are required." });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    assignee,
    status,
    projectId,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get tasks (optional filter by projectId)
router.get("/", (req, res) => {
  const { projectId } = req.query;
  const filtered = projectId ? tasks.filter((t) => t.projectId === projectId) : tasks;
  res.json(filtered);
});

// Update task details or status
router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found." });

  Object.assign(task, req.body);
  res.json(task);
});

// Delete a task
router.delete("/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.json({ message: "Task deleted successfully." });
});

// ----------------------------
// Routes for Comments

// Create a comment for a task
router.post("/:id/comments", (req, res) => {
  const { user, text } = req.body;
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found." });

  const newComment = {
    id: uuidv4(),
    taskId: req.params.id,
    user,
    text,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

// Get comments for a specific task
router.get("/:id/comments", (req, res) => {
  const taskComments = comments.filter((c) => c.taskId === req.params.id);
  res.json(taskComments);
});

// ----------------------------
// Routes for File Attachments

// Upload a file for a task
router.post("/:id/upload", upload.single("file"), (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found." });

  const newFile = {
    id: uuidv4(),
    taskId: req.params.id,
    filename: req.file.filename,
    original: req.file.originalname,
    url: `/uploads/task_files/${req.file.filename}`,
    uploadedAt: new Date().toISOString(),
  };
  attachments.push(newFile);
  res.status(201).json(newFile);
});

// Get attachments for a specific task
router.get("/:id/attachments", (req, res) => {
  const taskFiles = attachments.filter((a) => a.taskId === req.params.id);
  res.json(taskFiles);
});

module.exports = router;
