import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectOverview from './Projects/ProjectOverview';
import FinancialDashboard from './Financials/FinancialDashboard';
import SupplyChainDashboard from './SupplyChain/SupplyChainDashboard';
import SustainabilityDashboard from './Governance/SustainabilityDashboard';
import InventoryDashboard from './Inventory/InventoryDashboard';
import UserProfile from './UserProfile';
import photo45 from '../photos/photo73.jpg'; //  background

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {      
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        console.log("User logged in:", parsed);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${photo45})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#2f2f2f',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: 'rgba(47, 79, 79, 0.85)',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <h1 style={{ margin: 0 }}>SmartGrain Dashboard</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/projects')} style={navButtonStyle}>Projects</button>
          <button onClick={() => navigate('/financial-plan')} style={navButtonStyle}>Financials</button>
          <button onClick={() => navigate('/supply-chain')} style={navButtonStyle}>Supply Chain</button>
          <button onClick={() => navigate('/sustainability')} style={navButtonStyle}>Sustainability</button>
          <button onClick={() => navigate('/inventory')} style={navButtonStyle}>Inventory</button>
          <button onClick={() => navigate('/governance')} style={navButtonStyle}>Governance</button>
          <button onClick={() => navigate('/settings')} style={navButtonStyle}>Settings</button>
        </nav>
      </header>

      {/* Main Sections */}
      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem' }}>{user ? `Welcome, ${user.name}` : 'Welcome to the Dashboard'}</h2>

        <div id="profile">
          <SectionHeader title="Your Profile" link="#profile" />
          <UserProfile />
        </div>

        <div id="project">
          <SectionHeader title="Project Overview" link="#project" />
          <ProjectOverview />
        </div>

        <div id="financial">
          <SectionHeader title="Financial Summary" link="#financial" />
          <FinancialDashboard />
        </div>

        {/* Grouped: Supply & Inventory Overview */}
        <div id="supply-inventory">
          <SectionHeader title="Supply & Inventory Overview" link="#supply-inventory" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Supply Chain</h4>
              <SupplyChainDashboard />
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Inventory Overview</h4>
              <InventoryDashboard />
            </div>
          </div>
        </div>

        <div id="sustainability">
          <SectionHeader title="Sustainability" link="#sustainability" />
          <SustainabilityDashboard />
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#2f4f4f',
          color: '#fff',
          padding: '1rem 2rem',
          textAlign: 'center',
        }}
      >
        <p>&copy; {new Date().getFullYear()} SmartGrain Systems</p>
      </footer>
    </div>
  );
};

const SectionHeader = ({ title, link }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
    <h3 style={{ margin: 0 }}>{title}</h3>
    <a href={link} style={{ backgroundColor: '#d97706', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', textDecoration: 'none' }}>
      Go to {title}
    </a>
  </div>
);

const navButtonStyle = {
  backgroundColor: '#228B22',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default Dashboard;