import React, { useEffect, useState } from "react";
import axios from "axios";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    axios.get("/api/invoices").then((res) => setInvoices(res.data));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "green";
      case "Overdue":
        return "red";
      case "Sent":
        return "blue";
      default:
        return "gray";
    }
  };

  // Filter invoices based on status
  const filteredInvoices = invoices.filter((inv) => {
    if (statusFilter === "all") return true;
    return inv.status === statusFilter;
  });

  const summary = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "Paid").length,
    overdue: invoices.filter((i) => i.status === "Overdue").length,
    unpaid: invoices.filter((i) => ["Sent", "Draft"].includes(i.status)).length,
  };

  return (
    <div>
      <h3>Invoices</h3>

      {/* Export Buttons */}
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => window.open("/api/invoices/export/csv")}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Download CSV
        </button>
        <button
          onClick={() => window.open("/api/invoices/export/pdf")}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={cardStyle}>
          <strong>Unpaid:</strong> {summary.unpaid}
        </div>
        <div style={cardStyle}>
          <strong>Paid:</strong> {summary.paid}
        </div>
        <div style={cardStyle}>
          <strong>Overdue:</strong> {summary.overdue}
        </div>
        <div style={cardStyle}>
          <strong>Total:</strong> {summary.total}
        </div>
      </div>

      {/* Filter UI */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <label>Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Styled Invoice Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f8f9fa" }}>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((inv) => (
            <tr key={inv._id}>
              <td>{inv.projectId?.name || "N/A"}</td>
              <td>{inv.clientName}</td>
              <td>{new Date(inv.invoiceDate).toLocaleDateString()}</td>
              <td>${inv.items.reduce((sum, i) => sum + i.total, 0).toFixed(2)}</td>
              <td>
                <span
                  style={{
                    backgroundColor: getStatusColor(inv.status),
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85em",
                  }}
                >
                  {inv.status}
                </span>
              </td>
              <td>
                <button onClick={() => window.open(`/api/invoices/${inv._id}/pdf`)}>PDF</button>
                <button onClick={() => axios.post(`/api/invoices/${inv._id}/email`)}>Email</button>
                <button
                  onClick={() =>
                    axios
                      .put(`/api/invoices/${inv._id}/mark-paid`)
                      .then(() => window.location.reload())
                  }
                >
                  Mark Paid
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cardStyle = {
  background: "#f8f9fa",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 10,
  textAlign: "center",
  flex: 1,
};

export default InvoiceList;
