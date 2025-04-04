// routes/roles.js
const express = require("express");
const router = express.Router();
const {
  getAllRoles,
  createRole,
  deleteRole,
} = require("../controllers/roleController");

// Get all roles
router.get("/", getAllRoles);

// Create new role (optional)
router.post("/", createRole);

// Delete role by ID (optional)
router.delete("/:id", deleteRole);

module.exports = router;
