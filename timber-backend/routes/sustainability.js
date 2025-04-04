// routes/sustainability.js
const express = require("express");
const router = express.Router();
const { getSustainabilityScore } = require("../controllers/sustainabilityController");

// Route to calculate sustainability score
router.get("/score/:projectId", getSustainabilityScore);

module.exports = router;
