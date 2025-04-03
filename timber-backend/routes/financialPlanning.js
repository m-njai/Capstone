const express = require("express");
const { Parser } = require("json2csv");
const jsPDF = require("jspdf");
const autoTable = require("jspdf-autotable");
const authenticateToken = require("../middleware/authFirebase");

const router = express.Router();

// Simulated DB (replace with a real database later)
let finances = [];

// ----------------------------
// Routes for Financial Plans

// Save a new financial plan
router.post("/save", authenticateToken, (req, res) => {
  const { budget, expectedCost, actualCost } = req.body;
  const userId = req.user.id;

  const newRecord = { id: Date.now(), userId, budget, expectedCost, actualCost };
  finances.push(newRecord);

  res.status(201).json({ message: "Financial plan saved", data: newRecord });
});

// Get financial plans for the authenticated user
router.get("/my-plans", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userPlans = finances.filter((f) => f.userId === userId);
  res.json(userPlans);
});

// ----------------------------
// Export Endpoints

// Export financial plans as CSV
router.get("/export/csv", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userPlans = finances.filter((f) => f.userId === userId);

  const parser = new Parser({
    fields: ["budget", "expectedCost", "actualCost", "id"],
  });

  try {
    const csv = parser.parse(userPlans);
    res.header("Content-Type", "text/csv");
    res.attachment("financial_plans.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "Error generating CSV file" });
  }
});

// Export financial plans as PDF
router.get("/export/pdf", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const userPlans = finances.filter((f) => f.userId === userId);

  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Financial Plans Report", 14, 20);

  // Table
  const rows = userPlans.map((plan) => [
    `$${plan.budget.toFixed(2)}`,
    `$${plan.expectedCost.toFixed(2)}`,
    `$${plan.actualCost.toFixed(2)}`,
    plan.id,
  ]);

  autoTable(doc, {
    startY: 30,
    head: [["Budget", "Expected Cost", "Actual Cost", "ID"]],
    body: rows,
  });

  const pdf = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=financial_plans.pdf");
  res.send(Buffer.from(pdf, "binary"));
});

module.exports = router;
