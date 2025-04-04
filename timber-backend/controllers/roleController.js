// controllers/roleController.js
const Role = require("../models/Role");

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

// Optional: Create new role
const createRole = async (req, res) => {
  const { name, permissions } = req.body;
  if (!name) return res.status(400).json({ error: "Role name is required" });

  try {
    const existing = await Role.findOne({ name });
    if (existing) return res.status(409).json({ error: "Role already exists" });

    const newRole = await Role.create({ name, permissions });
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ error: "Failed to create role" });
  }
};

// Optional: Delete a role
const deleteRole = async (req, res) => {
  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Role not found" });
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete role" });
  }
};

module.exports = {
  getAllRoles,
  createRole,
  deleteRole,
};
