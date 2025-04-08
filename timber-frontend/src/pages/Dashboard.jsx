// Flexible Dashboard Component with All Features for All Users
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectOverview from "../pages/Projects/ProjectOverview";
import FinancialDashboard from "../pages/Financials/FinancialDashboard";
import SupplyChainDashboard from "../pages/SupplyChain/SupplyChainDashboard";
import SustainabilityDashboard from "../pages/Governance/SustainabilityDashboard";
import InventoryDashboard from "../pages/Inventory/InventoryDashboard";
import UserProfile from "../pages/UserProfile";
import photo45 from "../photos/photo13.jpg";
import "../css/index.css"; // Tailwind CSS loaded globally

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col text-gray-800 bg-cover bg-center"
      style={{ backgroundImage: `url(${photo45})` }}
    >
      <header className="bg-gray-800 bg-opacity-90 text-white px-6 py-4 flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold">SmartGrain Dashboard</h1>
        <nav className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <NavButton onClick={() => navigate("/projects")} label="Projects" />
          <NavButton onClick={() => navigate("/financial-plan")} label="Financials" />
          <NavButton onClick={() => navigate("/supply-chain")} label="Supply Chain" />
          <NavButton onClick={() => navigate("/sustainability")} label="Sustainability" />
          <NavButton onClick={() => navigate("/inventory")} label="Inventory" />
          <NavButton onClick={() => navigate("/governance")} label="Governance" />
          <NavButton onClick={() => navigate("/settings")} label="Settings" />
        </nav>
      </header>

      <main className="flex-1 px-6 py-4 space-y-10">
        <h2 className="text-xl sm:text-2xl font-semibold">
          {user ? `Welcome, ${user.name}` : "Welcome to the Dashboard"}
        </h2>

        <DashboardSection id="profile" title="Your Profile">
          <UserProfile />
        </DashboardSection>

        <DashboardSection id="project" title="Project Overview">
          <ProjectOverview />
        </DashboardSection>

        <DashboardSection id="financial" title="Financial Summary">
          <FinancialDashboard />
        </DashboardSection>

        <DashboardSection id="supply-inventory" title="Supply & Inventory Overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-2">Supply Chain</h4>
              <SupplyChainDashboard />
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">Inventory Overview</h4>
              <InventoryDashboard />
            </div>
          </div>
        </DashboardSection>

        <DashboardSection id="sustainability" title="Sustainability">
          <SustainabilityDashboard />
        </DashboardSection>
      </main>

      <footer className="bg-green-900 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} SmartGrain Systems</p>
      </footer>
    </div>
  );
};

const NavButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md text-sm sm:text-base"
  >
    {label}
  </button>
);

const DashboardSection = ({ id, title, children }) => (
  <section id={id} className="space-y-2">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-green-800">{title}</h3>
      <a
        href={`#${id}`}
        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm"
      >
        Go to {title}
      </a>
    </div>
    <div>{children}</div>
  </section>
);

export default Dashboard;
