const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// ----------------------------
// Inventory Schema & Model
const ItemSchema = new mongoose.Schema({
  category: String, // e.g., "Foundation and Groundwork", "Roofing"
  name: String,     // e.g., "Concrete", "Reinforcement Steel"
  quantity: Number,
  unit: String       // e.g., "cubic meters", "kg", "pieces"
});

const Item = mongoose.model("Item", ItemSchema);

// ----------------------------
// Transactions Schema & Model
const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

// ----------------------------
// Routes for Inventory

// Create Item
router.post("/inventory", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Items
router.get("/inventory", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ inventory: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Item
router.put("/inventory/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Item
router.delete("/inventory/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).send("Item deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------
// Routes for Transactions

// Add Transaction
router.post("/transactions", async (req, res) => {
  const tx = new Transaction(req.body);
  try {
    const savedTransaction = await tx.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Transaction
router.delete("/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Summary Stats
router.get("/transactions/summary", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Group by month
    const groupByMonth = (arr, type) =>
      arr
        .filter((t) => t.type === type)
        .reduce((acc, t) => {
          const month = new Date(t.date).toLocaleString("default", { month: "short" });
          const found = acc.find((m) => m.month === month);
          if (found) found.amount += t.amount;
          else acc.push({ month, amount: t.amount });
          return acc;
        }, []);

    const monthlyIncome = groupByMonth(transactions, "income");
    const monthlyExpense = groupByMonth(transactions, "expense");

    res.status(200).json({
      totalIncome,
      totalExpense,
      monthlyIncome,
      monthlyExpense,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
