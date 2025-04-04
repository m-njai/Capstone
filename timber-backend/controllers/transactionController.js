// routes/inventory.js
const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/inventoryController");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getTransactionSummary,
} = require("../controllers/transactionController");

// Inventory Routes
router.post("/inventory", createItem);
router.get("/inventory", getItems);
router.put("/inventory/:id", updateItem);
router.delete("/inventory/:id", deleteItem);

// Transaction Routes
router.post("/transactions", addTransaction);
router.get("/transactions", getTransactions);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/summary", getTransactionSummary);

module.exports = router;
