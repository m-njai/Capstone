const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description, location, status, startDate, assignedTeam } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required." });

    const project = new Project({ title, description, location, status, startDate, assignedTeam });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
};
