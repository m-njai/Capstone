// controllers/financialPlanController.js
const { Parser } = require("json2csv");
const jsPDF = require("jspdf");
const autoTable = require("jspdf-autotable");

// Simulated in-memory DB (replace with real DB later)
let finances = [];

const saveFinancialPlan = (req, res) => {
  const { budget, expectedCost, actualCost } = req.body;
  const userId = req.user.id;

  const newRecord = { id: Date.now(), userId, budget, expectedCost, actualCost };
  finances.push(newRecord);

  res.status(201).json({ message: "Financial plan saved", data: newRecord });
};

const getUserFinancialPlans = (req, res) => {
  const userId = req.user.id;
  const userPlans = finances.filter((f) => f.userId === userId);
  res.json(userPlans);
};

const exportFinancialPlansCSV = (req, res) => {
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
};

const exportFinancialPlansPDF = (req, res) => {
  const userId = req.user.id;
  const userPlans = finances.filter((f) => f.userId === userId);

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Financial Plans Report", 14, 20);

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
};

module.exports = {
  saveFinancialPlan,
  getUserFinancialPlans,
  exportFinancialPlansCSV,
  exportFinancialPlansPDF,
};
