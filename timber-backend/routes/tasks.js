const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let tasks = [
    { id: uuidv4(), title: "Site Preparation", description: "Clear the site.", status: "Pending", assigned_to: "John Doe" }
];

// Get all tasks
router.get("/", (req, res) => {
    res.json({ tasks });
});

// Create a new task
router.post("/create", (req, res) => {
    const { title, description, assigned_to } = req.body;
    if (!title || !description || !assigned_to) return res.status(400).json({ error: "All fields are required." });

    const newTask = { id: uuidv4(), title, description, status: "Pending", assigned_to };
    tasks.push(newTask);
    res.json({ message: "Task created successfully", task: newTask });
});

// Update task status
router.post("/update", (req, res) => {
    const { task_id, new_status } = req.body;
    let task = tasks.find(t => t.id === task_id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = new_status;
    res.json({ message: "Task updated successfully", updated_task: task });
});

module.exports = router;
