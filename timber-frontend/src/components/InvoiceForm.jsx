const express = require("express");
const router = express.Router();
const jsPDF = require("jspdf");
const autoTable = require("jspdf-autotable");
const Invoice = require("../models/Invoice"); // Ensure this path is correct based on your project structure

// Existing routes...

// Generate PDF for an invoice
router.get("/:id/pdf", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("projectId");

    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    // Initialize jsPDF document
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    // Add Invoice Details
    doc.setFontSize(12);
    doc.text(`Project: ${invoice.projectId?.name || "N/A"}`, 14, 30);
    doc.text(`Client: ${invoice.clientName}`, 14, 38);
    doc.text(`Email: ${invoice.clientEmail}`, 14, 46);
    doc.text(`Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`, 14, 54);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 14, 62);

    // Add table for invoice items
    const itemRows = invoice.items.map(item => [
      item.description,
      item.quantity,
      `$${item.rate.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 70,
      head: [["Description", "Qty", "Rate", "Total"]],
      body: itemRows
    });

    // Add totals
    const subtotal = invoice.items.reduce((sum, i) => sum + i.total, 0);
    const tax = (subtotal * invoice.taxRate) / 100;
    const total = subtotal + tax;

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Tax (${invoice.taxRate}%): $${tax.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 18);
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 30);

    // Add optional notes
    if (invoice.notes) {
      doc.setFontSize(10);
      doc.text(`Notes: ${invoice.notes}`, 14, doc.lastAutoTable.finalY + 45);
    }

    // Output PDF
    const pdf = doc.output();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=invoice_${invoice._id}.pdf`);
    res.send(Buffer.from(pdf, "binary"));
  } catch (err) {
    console.error("Error generating invoice PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

module.exports = router;
