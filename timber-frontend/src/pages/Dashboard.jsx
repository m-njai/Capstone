import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  DollarSign,
  Truck,
  PackageSearch,
  ShieldCheck,
  Settings
} from "lucide-react";

import ProjectOverview from "../pages/Projects/ProjectOverview";
import FinancialDashboard from "../pages/Financials/FinancialDashboard";
import SupplyChainDashboard from "../pages/SupplyChain/SupplyChainDashboard";
import ComplianceDashboard from "../pages/Governance/ComplianceDashboard";
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import OrderManager from "../components/OrderManager";
import Suppliers from "../pages/SupplyChain/Suppliers";
import DashboardImage from "../components/DashboardImage";

import ImageFinance from "../photos/photo26.jpg";
import ImageSupplyChain from "../photos/photo28.jpg";
import ImageProject from "../photos/photo30.jpg";
import ImageInventory from "../photos/photo27.jpg";
import ImageSuppliers from "../photos/photo66.jpg";
import ImageCompliance from "../photos/photo71.jpg";
import photoHero1 from '../photos/photo1.jpg';
import photoHero2 from '../photos/photo15.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [photoHero1, photoHero2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const buttons = [
    { label: "Projects", icon: <LayoutDashboard />, path: "/projects" },
    { label: "Financials", icon: <DollarSign />, path: "/financials" },
    { label: "Supply Chain", icon: <Truck />, path: "/supply-chain" },
    { label: "Inventory", icon: <PackageSearch />, path: "/inventory" },
    { label: "Governance", icon: <ShieldCheck />, path: "/governance" },
    { label: "Settings", icon: <Settings />, path: "/settings" },
  ];

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
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>SmartGrain Dashboard</h1>
        <nav style={{ display: "flex", gap: "0.75rem" }}>
          {buttons.map(({ label, icon, path }, index) => (
            <button
              key={index}
              onClick={() => navigate(path)}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                backgroundColor: "#3b82f6",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              {icon}
              {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Hero Banner */}
      <section style={{
        padding: "6rem 2rem",
        textAlign: "center",
        backgroundImage: `url(${heroImages[currentHero]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        transition: "background-image 1s ease-in-out",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "2.5rem" }}>Welcome to SmartGrain Dashboard</h2>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "1rem auto" }}>
            Manage your projects, financials, and supply chain effectively from one place.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ padding: "2rem" }}>
        <ProjectOverview />
        <DashboardImage
          src={ImageProject}
          alt="Overview Visual"
          caption="Project Overview – Key activities and tasks summary"
        />

        <FinancialDashboard />
        <DashboardImage
          src={ImageFinance}
          alt="Finance Snapshot"
          caption="Financial Dashboard – Budget and expenses overview"
        />

        <SupplyChainDashboard />
        <DashboardImage
          src={ImageSupplyChain}
          alt="Supply Flow"
          caption="Supply Chain Flow – From supplier to site"
        />

        <InventoryDashboard />
        <DashboardImage
          src={ImageInventory}
          alt="Inventory Visualization"
          caption="Inventory Levels – Stock tracking by category"
        />

        <OrderManager />
        <Suppliers />
        <DashboardImage
          src={ImageSuppliers}
          alt="Suppliers Chart"
          caption="Top-rated Supplier Distribution"
        />

        <ComplianceDashboard />
        <DashboardImage
          src={ImageCompliance}
          alt="Compliance Insight"
          caption="Compliance & Governance – Permit status and sustainability"
        />
      </main>

      {/* Footer */}
      <footer style={{
        padding: "1.5rem 2rem",
        backgroundColor: "#1f2937",
        color: "#fff",
        textAlign: "center"
      }}>
        © {new Date().getFullYear()} SmartGrain Systems. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
