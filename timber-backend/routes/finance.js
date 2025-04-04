// routes/finance.js
const express = require("express");
const router = express.Router();

const {
  getFinancialSummary,
  getMonthlyReports,
  exportMonthlyCSV,
  exportMonthlyPDF
} = require("../controllers/financeController");

// Summary
router.get("/summary", getFinancialSummary);

// Monthly breakdown
router.get("/reports/monthly", getMonthlyReports);

// Export endpoints
router.get("/reports/monthly/csv", exportMonthlyCSV);
router.get("/reports/monthly/pdf", exportMonthlyPDF);

module.exports = router;
