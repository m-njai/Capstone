import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext'; // For authentication
import ProtectedRoute from './components/ProtectedRoute'; // Role-based access control

// Document Management
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import DocumentReview from './components/DocumentReview';
import ExportComponent from './components/ExportComponent';
import GanttChart from './components/GanttChart';

// Pages
import LoginPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import FinancialPlan from './pages/FinancialPlan';

// Dashboards (from Dashboard folder)
import ComplianceDashboard from './pages/Dashboard/ComplianceDashboard';
import FinancialDashboard from './pages/Dashboard/FinancialDashboard';
import InventoryDashboard from './pages/Dashboard/InventoryDashboard';
import ProjectDashboard from './pages/Dashboard/ProjectDashboard';
import ProjectOverview from './pages/Dashboard/ProjectOverview';
import SettingsDashboard from './pages/Dashboard/PasswordSettings';
import SupplyChainDashboard from './pages/Dashboard/SupplyChainDashboard';
import SustainabilityDashboard from './pages/Dashboard/SustainabilityDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navigation Bar */}
        <nav>
          <Link to="/documents">Documents</Link>{" "}
          <Link to="/upload">Upload Document</Link>{" "}
          <Link to="/login">Login</Link>{" "}
          <Link to="/dashboard">Dashboard</Link>{" "}
          <Link to="/financial-plan">Financial Plan</Link>{" "}
          <Link to="/gantt-chart">Gantt Chart</Link>{" "}
        </nav>

        {/* Route Definitions */}
        <Routes>
          {/* Document Management */}
          <Route 
            path="/documents" 
            element={
              <ProtectedRoute roles={['Admin', 'Builder', 'Supplier', 'Compliance Officer']}>
                <DocumentList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute roles={['Admin', 'Builder', 'Supplier']}>
                <DocumentUpload />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/review/:docId" 
            element={
              <ProtectedRoute roles={['Admin', 'Compliance Officer']}>
                <DocumentReview />
              </ProtectedRoute>
            } 
          />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main Dashboard + Tools */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <div>
                  <Dashboard />
                  <ExportComponent />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/financial-plan" 
            element={
              <ProtectedRoute>
                <FinancialPlan />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gantt-chart" 
            element={
              <ProtectedRoute>
                <GanttChart />
              </ProtectedRoute>
            } 
          />

          {/* Individual Dashboards */}
          <Route 
            path="/dashboard/compliance" 
            element={
              <ProtectedRoute roles={['Admin', 'Compliance Officer']}>
                <ComplianceDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/financial" 
            element={
              <ProtectedRoute roles={['Admin', 'Finance Manager']}>
                <FinancialDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/inventory" 
            element={
              <ProtectedRoute roles={['Admin', 'Inventory Manager']}>
                <InventoryDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/project" 
            element={
              <ProtectedRoute roles={['Admin', 'Project Manager']}>
                <ProjectDashboard />
                <ProjectOverview />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/settings" 
            element={
              <ProtectedRoute roles={['Admin']}>
                <SettingsDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/supply-chain" 
            element={
              <ProtectedRoute roles={['Admin', 'Supplier Manager']}>
                <SupplyChainDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/sustainability" 
            element={
              <ProtectedRoute roles={['Admin', 'Sustainability Officer']}>
                <SustainabilityDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Catch-All Routes */}
          <Route path="*" element={<p>Not Found</p>} />
          <Route path="/" element={<Navigate to="/documents" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
