// routes/financialPlans.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authFirebase");
const {
  saveFinancialPlan,
  getUserFinancialPlans,
  exportFinancialPlansCSV,
  exportFinancialPlansPDF,
} = require("../controllers/financialPlanController");

// Save a new plan
router.post("/save", authenticateToken, saveFinancialPlan);

// Get plans for current user
router.get("/my-plans", authenticateToken, getUserFinancialPlans);

// Export
router.get("/export/csv", authenticateToken, exportFinancialPlansCSV);
router.get("/export/pdf", authenticateToken, exportFinancialPlansPDF);

module.exports = router;
