import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import TransactionForm from "../../components/TransactionForm";
import "chart.js/auto";

const FinancialDashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    monthlyIncome: [],
    monthlyExpense: [],
  });
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    projectId: "",
    startDate: "",
    endDate: "",
  });
  const [tab, setTab] = useState("overview");

  // Fetch project list and financial summary
  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
    refreshData();
  }, []);

  const refreshData = () => {
    axios
      .get("/api/finance/summary", {
        params: { projectId: filters.projectId, startDate: filters.startDate, endDate: filters.endDate },
      })
      .then((res) => setSummary(res.data));
  };

  const netBalance = summary.totalIncome - summary.totalExpense;
  const months = summary.monthlyIncome.map((i) => i.month);
  const incomeData = summary.monthlyIncome.map((i) => i.amount);
  const expenseData = summary.monthlyExpense.map((e) => e.amount);

  // Export functionalities
  const downloadCSV = () => {
    window.open("/api/finance/export/csv");
  };

  const downloadPDF = () => {
    window.open("/api/finance/export/pdf");
  };

  const downloadMonthlyCSV = () => {
    window.open("/api/finance/reports/monthly/csv");
  };

  const downloadMonthlyPDF = () => {
    window.open("/api/finance/reports/monthly/pdf");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Financial Dashboard</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select value={filters.projectId} onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}>
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
        <button onClick={refreshData}>Apply Filters</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        {["overview", "transactions", "reports"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "6px 16px",
              background: tab === t ? "#007bff" : "#f0f0f0",
              color: tab === t ? "white" : "#000",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <>
          {/* Summary Cards */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div className="card" style={{ padding: 16, background: "#e6f7e6" }}>
              <strong>Total Income:</strong> ${summary.totalIncome.toFixed(2)}
            </div>
            <div className="card" style={{ padding: 16, background: "#ffe6e6" }}>
              <strong>Total Expenses:</strong> ${summary.totalExpense.toFixed(2)}
            </div>
            <div className="card" style={{ padding: 16, background: "#e6f4ff" }}>
              <strong>Net Balance:</strong> ${netBalance.toFixed(2)}
            </div>
          </div>

          {/* Line Chart */}
          <div style={{ marginTop: 40 }}>
            <h4>Income vs Expense Over Time</h4>
            <Line
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Income",
                    data: incomeData,
                    borderColor: "#4caf50",
                    fill: false,
                  },
                  {
                    label: "Expenses",
                    data: expenseData,
                    borderColor: "#f44336",
                    fill: false,
                  },
                ],
              }}
            />
          </div>

          {/* Pie Chart */}
          <div style={{ marginTop: 40 }}>
            <h4>Income vs Expenses (Pie)</h4>
            <Pie
              data={{
                labels: ["Income", "Expenses"],
                datasets: [
                  {
                    backgroundColor: ["#4caf50", "#f44336"],
                    data: [summary.totalIncome, summary.totalExpense],
                  },
                ],
              }}
            />
          </div>
        </>
      )}

      {tab === "transactions" && (
        <>
          {/* Transaction Form */}
          <TransactionForm onNewTransaction={refreshData} />
          <p>List of all transactions coming soon...</p>
        </>
      )}

      {tab === "reports" && (
        <div style={{ marginTop: 20 }}>
          <h4>Download Monthly Summaries</h4>
          <button onClick={downloadMonthlyCSV} style={{ marginRight: 10 }}>
            Download CSV
          </button>
          <button onClick={downloadMonthlyPDF}>Download PDF</button>
          <div style={{ marginTop: 20 }}>
            <h4>Download Full Data</h4>
            <button onClick={downloadCSV} style={{ marginRight: 10 }}>
              Download Full CSV
            </button>
            <button onClick={downloadPDF}>Download Full PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;
