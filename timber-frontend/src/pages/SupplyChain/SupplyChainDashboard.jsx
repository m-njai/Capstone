import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderPerformanceReport from '../Inventory/OrderPerformanceReport';
import InventoryDashboard from '../Inventory/InventoryDashboard';
import OrderManager from '../../components/OrderManager';
import SupplierManager from '../../components/SupplierManager';
import GanttChart from '../../components/GanttChart';
import AlertsPanel from '../../components/AlertsPanel';
import Suppliers from './Suppliers';
import { LayoutDashboard } from 'lucide-react';

import photoHero1 from '../../photos/photo6.jpg';
import photoHero2 from '../../photos/photo66.jpg';

const SupplyChainDashboard = () => {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [photoHero1, photoHero2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2rem',
          backgroundColor: '#1f2937',
          color: '#fff'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Supply Chain Dashboard</h1>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
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
            Optimize Your Supply Chain
          </h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "1rem auto" }}>
            Manage suppliers, track deliveries, and stay ahead with real-time performance data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Supply Chain Performance Overview
        </h2>

        {/* Top Summary Section */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <OrderPerformanceReport />
          <InventoryDashboard />
        </div>

        {/* Charts and Alerts */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <GanttChart />
          <AlertsPanel />
        </div>

        {/* Suppliers and Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
          <SupplierManager />
          <OrderManager />
          <Suppliers />
        </div>

        {/* View Suppliers Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/suppliers">
            <button
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1.2rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              View All Suppliers
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SupplyChainDashboard;
