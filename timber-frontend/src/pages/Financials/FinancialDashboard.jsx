import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import TransactionForm from "./TransactionForm";
import FinancialPlan from "./FinancialPlan";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";
import "chart.js/auto";
import { LayoutDashboard } from "lucide-react";

import photoHero1 from "../../photos/photo31.jpg";
import photoHero2 from "../../photos/photo25.jpg";

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
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [photoHero1, photoHero2];

  useEffect(() => {
    axios.get("/api/projects").then((res) => setProjects(res.data));
    refreshData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
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
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 2rem",
          backgroundColor: "#1f2937",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Financial Dashboard
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <LayoutDashboard /> Home
        </button>
      </header>

      {/* Hero Banner */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          backgroundImage: `url(${heroImages[currentHero]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transition: "background-image 1s ease-in-out",
          position: "relative",
          animation: "fadeIn 1.5s ease-in",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "slideUp 1s ease-out",
          }}
        >
          <h2 style={{ fontSize: "2.25rem" }}>
            Stay On Top of Your Financials
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "1rem auto",
            }}
          >
            Monitor cashflow, manage invoices, and plan ahead with SmartGrain’s
            finance tools.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ padding: "2rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <select
            value={filters.projectId}
            onChange={(e) =>
              setFilters({ ...filters, projectId: e.target.value })
            }
          >
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
          <button
            onClick={refreshData}
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
            }}
          >
            Apply Filters
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {[
            "overview",
            "transactions",
            "financialPlan",
            "invoiceForm",
            "invoiceList",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: tab === t ? "#3b82f6" : "#e5e7eb",
                color: tab === t ? "#fff" : "#111827",
                borderRadius: "6px",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "overview" && (
          <>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#e6f7e6",
                  borderRadius: "6px",
                }}
              >
                <strong>Total Income:</strong> $
                {summary.totalIncome.toFixed(2)}
              </div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#ffe6e6",
                  borderRadius: "6px",
                }}
              >
                <strong>Total Expenses:</strong> $
                {summary.totalExpense.toFixed(2)}
              </div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#e6f4ff",
                  borderRadius: "6px",
                }}
              >
                <strong>Net Balance:</strong> ${netBalance.toFixed(2)}
              </div>
            </div>

            <Line
              data={{
                labels: months,
                datasets: [
                  {
                    label: "Income",
                    data: incomeData,
                    borderColor: "#4caf50",
                  },
                  {
                    label: "Expenses",
                    data: expenseData,
                    borderColor: "#f44336",
                  },
                ],
              }}
            />

            <Pie
              data={{
                labels: ["Income", "Expenses"],
                datasets: [
                  {
                    data: [summary.totalIncome, summary.totalExpense],
                    backgroundColor: ["#4caf50", "#f44336"],
                  },
                ],
              }}
            />
          </>
        )}

        {tab === "transactions" && (
          <TransactionForm onNewTransaction={refreshData} />
        )}
        {tab === "financialPlan" && <FinancialPlan />}
        {tab === "invoiceForm" && <InvoiceForm />}
        {tab === "invoiceList" && <InvoiceList />}
      </main>
    </div>
  );
};

export default FinancialDashboard;
