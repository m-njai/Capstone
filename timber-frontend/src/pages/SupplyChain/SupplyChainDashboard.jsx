import React from 'react';
import OrderPerformanceReport from '../Inventory/OrderPerformanceReport';
import InventoryDashboard from '../Inventory/InventoryDashboard';
import OrderManager from "../../components/OrderManager";
import SupplierManager from "../../components/SupplierManager";
import GanttChart from '../../components/GanttChart';
import AlertsPanel from '../../components/AlertsPanel';

const SupplyChainDashboard = () => {
  return (
    <div style={{ padding: 16, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Supply Chain Dashboard</h2>

      {/* Top Summary Section */}
      <div className="dashboard-section responsive-row">
        <OrderPerformanceReport />
        <InventoryDashboard />
      </div>

      {/* Charts and Alerts */}
      <div className="supplychaindashboard-section responsive-row">
        <GanttChart />
        <AlertsPanel />
      </div>

      {/* Suppliers and Orders */}
      <div className="supplychaindashboard-section responsive-column">
        <SupplierManager />
        <OrderManager />
      </div>
    </div>
  );
};

export default SupplyChainDashboard;
