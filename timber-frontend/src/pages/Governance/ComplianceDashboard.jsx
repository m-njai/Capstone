import React, { useEffect, useState } from "react";
import axios from "axios";
import ComplianceUpload from "../../components/ComplianceUpload";
import ComplianceChecklist from "../../components/ComplianceChecklist";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintLog from "../../components/ComplaintLog";
import SustainabilityDashboard from "./SustainabilityDashboard";

const ComplianceDashboard = ({ projectId }) => {
  const [documents, setDocuments] = useState([]);

  const fetchDocs = async () => {
    const res = await axios.get("/api/compliance");
    setDocuments(res.data.documents || []);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Compliance & Sustainability Dashboard</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ flex: 1 }}><ComplianceUpload projectId={projectId} /></div>
        <div style={{ flex: 1 }}><ComplianceChecklist documents={documents} /></div>
      </div>

      <div style={{ marginTop: 20 }}><SustainabilityDashboard projectId={projectId} /></div>

      <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
        <div style={{ flex: 1 }}><ComplaintForm projectId={projectId} /></div>
        <div style={{ flex: 1 }}><ComplaintLog /></div>
      </div>
    </div>
  );
};

export default ComplianceDashboard;
