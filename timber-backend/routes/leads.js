// routes/leads.js
const express = require("express");
const router = express.Router();
const { createLead, getLeads } = require("../controllers/leadController");

// Public: Create new lead
router.post("/", createLead);

// Admin: Get all leads
router.get("/", getLeads);

module.exports = router;
