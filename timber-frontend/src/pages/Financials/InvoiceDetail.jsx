// components/InvoiceDetail.jsx
import React, { useEffect, useState } from "react";
import { fetchInvoiceById, generateInvoicePDF } from "../services/invoiceService";

const InvoiceDetail = ({ id }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const data = await fetchInvoiceById(id);
      setInvoice(data);
    };
    fetchInvoice();
  }, [id]);

  const handleDownloadPDF = async () => {
    await generateInvoicePDF(id);
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div>
      <h1>Invoice Detail</h1>
      <p>Client: {invoice.clientName}</p>
      <p>Email: {invoice.clientEmail}</p>
      <p>Invoice Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
      <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
      <p>Tax Rate: {invoice.taxRate}%</p>
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default InvoiceDetail;
