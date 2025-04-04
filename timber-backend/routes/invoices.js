// routes/invoices.js
const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
  emailInvoice,
  markAsPaid,
  exportInvoicesCSV,
  exportInvoicesPDF
} = require("../controllers/invoiceController");

// Routes
router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.put("/:id/status", updateInvoiceStatus);
router.delete("/:id", deleteInvoice);
router.post("/:id/email", emailInvoice);
router.put("/:id/mark-paid", markAsPaid);
router.get("/export/csv", exportInvoicesCSV);
router.get("/export/pdf", exportInvoicesPDF);

module.exports = router;
