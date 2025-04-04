// controllers/projectShowcaseController.js
const Project = require("../models/ProjectShowcase");

const createProjectShowcase = async (req, res) => {
  const { title, description, location } = req.body;

  if (!title || !req.files || req.files.length === 0) {
    return res.status(400).json({ error: "Title and at least one image are required." });
  }

  const imagePaths = req.files.map((file) => `/uploads/projects/${file.filename}`);

  try {
    const newProject = await Project.create({
      title,
      description,
      location,
      images: imagePaths,
    });
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to save project" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
};

module.exports = {
  createProjectShowcase,
  getAllProjects,
};
