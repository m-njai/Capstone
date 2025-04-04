// controllers/financeController.js
const { Parser } = require("json2csv");
const jsPDF = require("jspdf");
const autoTable = require("jspdf-autotable");
const Transaction = require("../models/Transaction");

const getFinancialSummary = async (req, res) => {
  const { projectId, startDate, endDate } = req.query;
  const query = {};

  if (projectId) query.projectId = projectId;
  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const transactions = await Transaction.find(query);

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const groupByMonth = (arr, type) =>
    arr
      .filter(t => t.type === type)
      .reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString("default", { month: "short" });
        const found = acc.find(m => m.month === month);
        if (found) found.amount += t.amount;
        else acc.push({ month, amount: t.amount });
        return acc;
      }, []);

  const monthlyIncome = groupByMonth(transactions, "income");
  const monthlyExpense = groupByMonth(transactions, "expense");

  res.json({ totalIncome, totalExpense, monthlyIncome, monthlyExpense });
};

const getMonthlyReports = async (req, res) => {
  const { projectId } = req.query;
  const query = projectId ? { projectId } : {};
  const transactions = await Transaction.find(query);

  const summaries = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { year: "numeric", month: "short" });
    if (!summaries[month]) summaries[month] = { income: 0, expense: 0 };
    if (t.type === "income") summaries[month].income += t.amount;
    else summaries[month].expense += t.amount;
  });

  const result = Object.entries(summaries).map(([month, data]) => ({
    month,
    ...data,
    balance: data.income - data.expense,
  }));

  res.json(result);
};

const exportMonthlyCSV = async (req, res) => {
  const { projectId } = req.query;
  const query = projectId ? { projectId } : {};
  const transactions = await Transaction.find(query);

  const summaries = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { year: "numeric", month: "short" });
    if (!summaries[month]) summaries[month] = { income: 0, expense: 0 };
    if (t.type === "income") summaries[month].income += t.amount;
    else summaries[month].expense += t.amount;
  });

  const rows = Object.entries(summaries).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense,
    balance: data.income - data.expense,
  }));

  const parser = new Parser();
  const csv = parser.parse(rows);

  res.header("Content-Type", "text/csv");
  res.attachment("monthly_financial_report.csv");
  res.send(csv);
};

const exportMonthlyPDF = async (req, res) => {
  const { projectId } = req.query;
  const query = projectId ? { projectId } : {};
  const transactions = await Transaction.find(query);

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
    body: rows,
  });

  const pdf = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=monthly_financial_report.pdf");
  res.send(Buffer.from(pdf, "binary"));
};

module.exports = {
  getFinancialSummary,
  getMonthlyReports,
  exportMonthlyCSV,
  exportMonthlyPDF
};
