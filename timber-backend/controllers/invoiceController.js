// controllers/invoiceController.js
const Invoice = require("../models/Invoice");
const nodemailer = require("nodemailer");
const jsPDF = require("jspdf");
const autoTable = require("jspdf-autotable");
const { Parser } = require("json2csv");

const createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.status(201).json(invoice);
};

const getAllInvoices = async (req, res) => {
  const invoices = await Invoice.find().populate("projectId");
  res.json(invoices);
};

const getInvoiceById = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate("projectId");
  res.json(invoice);
};

const updateInvoiceStatus = async (req, res) => {
  const { status } = req.body;
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(invoice);
};

const deleteInvoice = async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Invoice deleted" });
};

const emailInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("projectId");
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    const doc = new jsPDF();
    doc.text("Invoice", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Description", "Qty", "Rate", "Total"]],
      body: invoice.items.map((i) => [
        i.description,
        i.quantity,
        `$${i.rate}`,
        `$${i.total}`
      ])
    });
    const pdfBuffer = Buffer.from(doc.output(), "binary");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: invoice.clientEmail,
      subject: `Invoice for ${invoice.projectId?.name || "Your Project"}`,
      text: `Hello ${invoice.clientName},\n\nPlease find attached your invoice.`,
      attachments: [
        {
          filename: `Invoice_${invoice._id}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    await Invoice.findByIdAndUpdate(req.params.id, { status: "Sent" });
    res.json({ message: "Invoice emailed successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to email invoice" });
  }
};

const markAsPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status: "Paid" },
      { new: true }
    );
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    console.error("Error marking invoice as Paid:", err);
    res.status(500).json({ error: "Failed to mark invoice as Paid" });
  }
};

const exportInvoicesCSV = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("projectId");

    const rows = invoices.map(inv => {
      const subtotal = inv.items.reduce((sum, i) => sum + i.total, 0);
      const tax = (subtotal * inv.taxRate) / 100;
      const total = subtotal + tax;

      return {
        Project: inv.projectId?.name || "N/A",
        Client: inv.clientName,
        Email: inv.clientEmail,
        Status: inv.status,
        Date: new Date(inv.invoiceDate).toLocaleDateString(),
        Total: total.toFixed(2)
      };
    });

    const parser = new Parser();
    const csv = parser.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("invoices.csv");
    res.send(csv);
  } catch (err) {
    console.error("Error exporting CSV:", err);
    res.status(500).json({ error: "Failed to export CSV" });
  }
};

const exportInvoicesPDF = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("projectId");
    const doc = new jsPDF();

    doc.text("Invoice Report", 14, 20);

    const rows = invoices.map(inv => {
      const total = inv.items.reduce((sum, i) => sum + i.total, 0) * (1 + inv.taxRate / 100);
      return [
        inv.projectId?.name || "N/A",
        inv.clientName,
        inv.status,
        new Date(inv.invoiceDate).toLocaleDateString(),
        `$${total.toFixed(2)}`
      ];
    });

    autoTable(doc, {
      startY: 30,
      head: [["Project", "Client", "Status", "Date", "Total"]],
      body: rows
    });

    const pdf = doc.output();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoices.pdf");
    res.send(Buffer.from(pdf, "binary"));
  } catch (err) {
    console.error("Error exporting PDF:", err);
    res.status(500).json({ error: "Failed to export PDF" });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
  emailInvoice,
  markAsPaid,
  exportInvoicesCSV,
  exportInvoicesPDF
};
