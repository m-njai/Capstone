// components/InvoiceForm.jsx
import React, { useState } from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    invoiceDate: "",
    dueDate: "",
    taxRate: 0,
    items: [{ description: "", quantity: 1, rate: 0 }],
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Client: ${formData.clientName}`, 14, 30);
    doc.text(`Email: ${formData.clientEmail}`, 14, 36);
    doc.text(`Date: ${formData.invoiceDate}`, 14, 42);
    doc.text(`Due: ${formData.dueDate}`, 14, 48);

    autoTable(doc, {
      startY: 56,
      head: [["Description", "Quantity", "Rate", "Total"]],
      body: formData.items.map((item) => [
        item.description,
        item.quantity,
        item.rate,
        (item.quantity * item.rate).toFixed(2),
      ]),
    });

    const subtotal = formData.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    const tax = (subtotal * formData.taxRate) / 100;
    const total = subtotal + tax;

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Tax (${formData.taxRate}%): $${tax.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 16);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 22);

    if (formData.notes) {
      doc.text("Notes:", 14, doc.lastAutoTable.finalY + 32);
      doc.text(formData.notes, 14, doc.lastAutoTable.finalY + 38);
    }

    doc.save("invoice.pdf");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 800, margin: "auto", padding: "2rem", backgroundColor: "#f9fafb", borderRadius: 8 }}>
      <h2 style={{ marginBottom: "1rem" }}>Create Invoice</h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        <input name="clientName" type="text" placeholder="Client Name" value={formData.clientName} onChange={handleChange} required />
        <input name="clientEmail" type="email" placeholder="Client Email" value={formData.clientEmail} onChange={handleChange} required />
        <input name="invoiceDate" type="date" value={formData.invoiceDate} onChange={handleChange} required />
        <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
        <input name="taxRate" type="number" step="0.01" placeholder="Tax Rate (%)" value={formData.taxRate} onChange={handleChange} />
      </div>

      <h3 style={{ marginTop: "2rem" }}>Items</h3>
      {formData.items.map((item, index) => (
        <div key={index} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleItemChange(index, "description", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", +e.target.value)}
            min="1"
            required
          />
          <input
            type="number"
            placeholder="Rate"
            value={item.rate}
            onChange={(e) => handleItemChange(index, "rate", +e.target.value)}
            step="0.01"
            required
          />
        </div>
      ))}
      <Button variant="outlined" onClick={addItem} style={{ marginBottom: "1rem" }}>Add Item</Button>

      <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange} rows={4} style={{ width: "100%" }} />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
        <Button type="submit" variant="contained" color="primary">Save Invoice</Button>
        <Button variant="outlined" color="secondary" onClick={generatePDF}>Export PDF</Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
