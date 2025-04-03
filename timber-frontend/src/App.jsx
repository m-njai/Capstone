import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Document Management
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import DocumentReview from './components/DocumentReview';
import ExportComponent from './components/ExportComponent';
import GanttChart from './components/GanttChart';

// Pages
import LandingPage from './pages/LandingPage'; // Corrected name
import Login from './pages/Login';             // Corrected usage
import Register from './pages/Register';
import FinancialPlan from './pages/FinancialPlan';
import Dashboard from './pages/Dashboard';     // Main dashboard wrapper

// Dashboards
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
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


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

          {/* Dashboard + Tools */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Dashboard />
                  <ExportComponent />
                </>
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

          {/* Sub-Dashboards */}
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
                <>
                  <ProjectDashboard />
                  <ProjectOverview />
                </>
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

          {/* Catch-All */}
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
