const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // Generate unique task IDs
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8003;

app.use(cors());
app.use(bodyParser.json());

// Sample project tasks
let tasks = [
    { id: uuidv4(), title: "Site Preparation", description: "Clear the site and level the ground.", status: "Pending", assigned_to: "John Doe", due_date: "2025-04-10" },
    { id: uuidv4(), title: "Timber Frame Assembly", description: "Assemble prefabricated timber frames.", status: "In Progress", assigned_to: "Jane Smith", due_date: "2025-04-15" },
];

// ✅ Get all tasks
app.get("/tasks", (req, res) => {
    res.json({ tasks });
});

// ✅ Create a new task
app.post("/create-task", (req, res) => {
    const { title, description, assigned_to, due_date } = req.body;

    if (!title || !description || !assigned_to || !due_date) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const newTask = {
        id: uuidv4(),
        title,
        description,
        status: "Pending",
        assigned_to,
        due_date
    };

    tasks.push(newTask);
    res.json({ message: "Task created successfully", task: newTask });
});

// ✅ Update task status
app.post("/update-task", (req, res) => {
    const { task_id, new_status } = req.body;

    let task = tasks.find(t => t.id === task_id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.status = new_status;
    res.json({ message: "Task updated successfully", updated_task: task });
});

// ✅ Delete a task
app.delete("/delete-task", (req, res) => {
    const { task_id } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === task_id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Project Task Management API running on http://localhost:${PORT}`);
});
