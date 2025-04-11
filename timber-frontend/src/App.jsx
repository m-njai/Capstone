import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './firebase';

// Document Management
import DocumentList from './components/DocumentList';
import DocumentUpload from './components/DocumentUpload';
import DocumentReview from './components/DocumentReview';
import ExportComponent from './components/ExportComponent';
import GanttChart from './components/GanttChart';
import ProjectGallery from './components/ProjectGallery';
import ProjectManager from './pages/projects/ProjectManager';
import TaskBoard from './components/TaskBoard';
import ProjectForm from './pages/projects/ProjectForm';
import ProjectUploadForm from './components/ProjectUploadForm';
// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Dashboards
import ComplianceDashboard from './pages/Governance/ComplianceDashboard';
import FinancialDashboard from './pages/Financials/FinancialDashboard';
import InventoryDashboard from './pages/Inventory/InventoryDashboard';
import ProjectDashboard from './pages/Projects/ProjectDashboard';
import ProjectOverview from './pages/Projects/ProjectOverview';
import SettingsDashboard from './pages/PasswordSettings';
import SupplyChainDashboard from './pages/SupplyChain/SupplyChainDashboard';
import UserProfile from './pages/UserProfile';
import Suppliers from './pages/SupplyChain/Suppliers';

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
          <Route path="/documents" element={<ProtectedRoute><DocumentList /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
          <Route path="/review/:docId" element={<ProtectedRoute roles={["Admin", "Compliance Officer"]}><DocumentReview /></ProtectedRoute>} />
          <Route path="/project-gallery" element={<ProtectedRoute><ProjectGallery /></ProtectedRoute>} />
          <Route path="/project-manager" element={<ProtectedRoute><ProjectManager /></ProtectedRoute>} />
          <Route path="/task-board" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
          <Route path="/project-form" element={<ProtectedRoute><ProjectForm /></ProtectedRoute>} />
          <Route path="/project-upload-form" element={<ProtectedRoute><ProjectUploadForm /></ProtectedRoute>} />
          <Route path="/export" element={<ProtectedRoute><ExportComponent /></ProtectedRoute>} />
          <Route path="/document-review" element={<ProtectedRoute><DocumentReview /></ProtectedRoute>} />
          <Route path="/document-list" element={<ProtectedRoute><DocumentList /></ProtectedRoute>} />
          <Route path="/document-upload" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
       
          {/* Dashboard + Tools */}
          <Route path="/dashboard" element={<ProtectedRoute><><Dashboard /><ExportComponent /></></ProtectedRoute>} />
          <Route path="/gantt-chart" element={<ProtectedRoute><GanttChart /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><ProjectDashboard /></ProtectedRoute>} />
          <Route path="/supply-chain" element={<ProtectedRoute><SupplyChainDashboard /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><InventoryDashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsDashboard /></ProtectedRoute>} />
          <Route path="/governance" element={<ProtectedRoute><ComplianceDashboard /></ProtectedRoute>} />
          <Route path="/financials" element={<ProtectedRoute><FinancialDashboard /></ProtectedRoute>} />
          <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Sub-Dashboards */}
          <Route path="/dashboard/compliance" element={<ProtectedRoute roles={["Admin", "Compliance Officer"]}><ComplianceDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/financial" element={<ProtectedRoute><FinancialDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/inventory" element={<ProtectedRoute><InventoryDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/project" element={<ProtectedRoute><><ProjectDashboard /><ProjectOverview /></></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/supply-chain" element={<ProtectedRoute><SupplyChainDashboard /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />

          {/* Catch-All */}
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
