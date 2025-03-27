const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  clientName: String,
  clientEmail: String,
  invoiceDate: { type: Date, default: Date.now },
  dueDate: Date,
  status: { type: String, enum: ["Draft", "Sent", "Paid", "Overdue"], default: "Draft" },
  items: [
    {
      description: String,
      quantity: Number,
      rate: Number,
      total: Number
    }
  ],
  taxRate: { type: Number, default: 0 },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Invoice", InvoiceSchema);
