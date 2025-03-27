import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { isThisMonth, parseISO } from "date-fns";

const OrderPerformanceReport = () => {
  const [report, setReport] = useState({
    total: 0,
    delivered: 0,
    delayed: 0,
    pending: 0,
  });

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    supplierId: "",
  });

  const [suppliers, setSuppliers] = useState([]);

  // Fetch suppliers on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/suppliers").then((res) => {
      setSuppliers(res.data.suppliers || []);
    });
  }, []);

  // Fetch orders with filters
  const fetchFilteredReport = async () => {
    const res = await axios.get("http://localhost:5000/api/suppliers/orders");
    const allOrders = res.data.orders || [];

    let filtered = allOrders;

    if (filters.startDate) {
      filtered = filtered.filter(
        (o) => new Date(o.timestamp) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        (o) => new Date(o.timestamp) <= new Date(filters.endDate)
      );
    }
    if (filters.supplierId) {
      filtered = filtered.filter((o) => o.supplier_id === filters.supplierId);
    }

    const delivered = filtered.filter((o) => o.status === "Delivered").length;
    const delayed = filtered.filter(
      (o) =>
        o.status !== "Delivered" &&
        o.expected_delivery &&
        new Date(o.expected_delivery) < new Date()
    ).length;
    const pending = filtered.filter((o) => o.status !== "Delivered").length;

    setReport({
      total: filtered.length,
      delivered,
      delayed,
      pending,
    });
  };

  // Export Report as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Monthly Order Performance Report", 14, 16);
    doc.autoTable({
      head: [["Metric", "Count"]],
      body: [
        ["Total Orders", report.total],
        ["Delivered On Time", report.delivered],
        ["Delayed", report.delayed],
        ["Pending/In Transit", report.pending],
      ],
      startY: 24,
    });
    doc.save("monthly_order_report.pdf");
  };

  // Export Report as CSV
  const downloadCSV = () => {
    const csv = `Metric,Count
Total Orders,${report.total}
Delivered On Time,${report.delivered}
Delayed,${report.delayed}
Pending/In Transit,${report.pending}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly_order_report.csv";
    a.click();
  };

  useEffect(() => {
    fetchFilteredReport();
  }, []);

  return (
    <div style={{ padding: 20, background: "#f9f9f9", borderRadius: 8 }}>
      <h3>Monthly Order Report</h3>

      {/* Filter Inputs */}
      <div style={{ marginBottom: 16 }}>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />

        <label style={{ marginLeft: 10 }}>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />

        <label style={{ marginLeft: 10 }}>Supplier:</label>
        <select
          value={filters.supplierId}
          onChange={(e) =>
            setFilters({ ...filters, supplierId: e.target.value })
          }
        >
          <option value="">All Suppliers</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button
          style={{ marginLeft: 10 }}
          onClick={fetchFilteredReport}
        >
          Apply Filters
        </button>
      </div>

      {/* Report Content */}
      <ul>
        <li>Total Orders: {report.total}</li>
        <li>Delivered On Time: {report.delivered}</li>
        <li>Delayed: {report.delayed}</li>
        <li>Still Pending/In Transit: {report.pending}</li>
      </ul>

      {/* Export Buttons */}
      <div style={{ marginTop: 10 }}>
        <button onClick={downloadPDF}>Export PDF</button>
        <button onClick={downloadCSV} style={{ marginLeft: 10 }}>
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default OrderPerformanceReport;
