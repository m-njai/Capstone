import React from 'react';
import ProjectOverview from './Dashboard/ProjectOverview';
import FinancialDashboard from './Dashboard/FinancialDashboard';
import SupplyChainDashboard from './Dashboard/SupplyChainDashboard';
import SustainabilityDashboard from './Dashboard/SustainabilityDashboard';
import InventoryDashboard from './Dashboard/InventoryDashboard';
import UserProfile from './Dashboard/UserProfile';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Smart Timber Construction Dashboard</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Project Overview</h2>
        <ProjectOverview />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Financial Summary</h2>
        <FinancialDashboard />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Supply Chain</h2>
        <SupplyChainDashboard />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Sustainability</h2>
        <SustainabilityDashboard />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Inventory Status</h2>
        <InventoryDashboard />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>User Profile</h2>
        <UserProfile />
      </section>
    </div>
  );
};

export default Dashboard;
