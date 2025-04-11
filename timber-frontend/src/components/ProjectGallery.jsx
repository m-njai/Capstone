import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import TransactionForm from "../pages/Financials/TransactionForm";
import "chart.js/auto";
import { LayoutDashboard } from "lucide-react";

const FinancialDashboard = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
    refreshData();
  }, []);

  const refreshData = () => {
    axios
      .get("/api/finance/summary", { params: filters })
      .then((res) => setSummary(res.data));
  };

  const netBalance = summary.totalIncome - summary.totalExpense;
  const months = summary.monthlyIncome.map((i) => i.month);
  const incomeData = summary.monthlyIncome.map((i) => i.amount);
  const expenseData = summary.monthlyExpense.map((e) => e.amount);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        backgroundColor: "#1f2937",
        color: "#fff"
      }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Financial Dashboard</h1>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ padding: "0.5rem 1rem", backgroundColor: "#3b82f6", color: "#fff", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <LayoutDashboard /> Home
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: "2rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <select value={filters.projectId} onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}>
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
          <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
          <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
          <button onClick={refreshData} style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "0.5rem 1rem", borderRadius: "6px" }}>Apply Filters</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {["overview", "transactions"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ padding: "0.5rem 1rem", backgroundColor: tab === t ? "#3b82f6" : "#e5e7eb", color: tab === t ? "#fff" : "#111827", borderRadius: "6px" }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ padding: "1rem", backgroundColor: "#e6f7e6", borderRadius: "6px" }}>
                <strong>Total Income:</strong> ${summary.totalIncome.toFixed(2)}
              </div>
              <div style={{ padding: "1rem", backgroundColor: "#ffe6e6", borderRadius: "6px" }}>
                <strong>Total Expenses:</strong> ${summary.totalExpense.toFixed(2)}
              </div>
              <div style={{ padding: "1rem", backgroundColor: "#e6f4ff", borderRadius: "6px" }}>
                <strong>Net Balance:</strong> ${netBalance.toFixed(2)}
              </div>
            </div>

            <Line data={{ labels: months, datasets: [{ label: "Income", data: incomeData, borderColor: "#4caf50" }, { label: "Expenses", data: expenseData, borderColor: "#f44336" }] }} />
            <Pie data={{ labels: ["Income", "Expenses"], datasets: [{ data: [summary.totalIncome, summary.totalExpense], backgroundColor: ["#4caf50", "#f44336"] }] }} />
          </>
        )}

        {tab === "transactions" && (
          <TransactionForm onNewTransaction={refreshData} />
        )}
      </main>
    </div>
  );
};

export default FinancialDashboard;
