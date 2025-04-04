// controllers/taskController.js
const { v4: uuidv4 } = require("uuid");

// In-memory storage
let tasks = [];
let comments = [];
let attachments = [];

// ------------------------
// TASKS
const createTask = (req, res) => {
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
};

const getTasks = (req, res) => {
  const { projectId } = req.query;
  const result = projectId ? tasks.filter((t) => t.projectId === projectId) : tasks;
  res.json(result);
};

const updateTask = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found." });

  Object.assign(task, req.body);
  res.json(task);
};

const deleteTask = (req, res) => {
  tasks = tasks.filter((t) => t.id !== req.params.id);
  res.json({ message: "Task deleted successfully." });
};

// ------------------------
// COMMENTS
const addComment = (req, res) => {
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
};

const getComments = (req, res) => {
  const taskComments = comments.filter((c) => c.taskId === req.params.id);
  res.json(taskComments);
};

// ------------------------
// ATTACHMENTS
const uploadFile = (req, res) => {
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
};

const getAttachments = (req, res) => {
  const taskFiles = attachments.filter((a) => a.taskId === req.params.id);
  res.json(taskFiles);
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  addComment,
  getComments,
  uploadFile,
  getAttachments,
};
