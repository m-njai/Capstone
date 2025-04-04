// routes/costEstimation.js
const express = require("express");
const router = express.Router();
const { estimateTimberCost } = require("../controllers/estimationController");

router.post("/", estimateTimberCost);

module.exports = router;
