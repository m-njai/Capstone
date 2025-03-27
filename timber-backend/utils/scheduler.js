const cron = require("node-cron");
const jsPDF = require("jspdf");
const autoTable = require("jspdf-autotable");
const fs = require("fs");
const Transaction = require("../models/Transaction");

// Runs on 1st of each month at 12:00am
cron.schedule("0 0 1 * *", async () => {
  console.log("Generating scheduled monthly financial report...");

  const transactions = await Transaction.find();

  const summaries = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { year: "numeric", month: "short" });
    if (!summaries[month]) summaries[month] = { income: 0, expense: 0 };
    if (t.type === "income") summaries[month].income += t.amount;
    else summaries[month].expense += t.amount;
  });

  const rows = Object.entries(summaries).map(([month, data]) => [
    month,
    `$${data.income.toFixed(2)}`,
    `$${data.expense.toFixed(2)}`,
    `$${(data.income - data.expense).toFixed(2)}`
  ]);

  const doc = new jsPDF();
  doc.text("Monthly Financial Summary", 14, 20);
  autoTable(doc, {
    startY: 30,
    head: [["Month", "Income", "Expenses", "Balance"]],
    body: rows
  });

  const now = new Date();
  const filename = `report_${now.getFullYear()}_${now.getMonth() + 1}.pdf`;

  fs.writeFileSync(`./reports/${filename}`, doc.output());
  console.log(`Saved: /reports/${filename}`);
});
