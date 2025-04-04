const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  note: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" } // Reference to Project
});
const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
