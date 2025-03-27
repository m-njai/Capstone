const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead"); // <- Corrected path to model

// Create new lead
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email required" });

  try {
    const lead = await Lead.create({ name, email, phone, message });
    res.status(201).json({ message: "Lead submitted", lead });
  } catch (err) {
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// Get all leads (Admin view)
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ submittedAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Error fetching leads" });
  }
});

module.exports = router;
