import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplianceChecklist = ({ documents }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const today = new Date();
    const checklist = [];

    const requiredDocs = ["Site Safety Plan", "Building Permit", "Environmental Consent"];

    requiredDocs.forEach(docType => {
      const doc = documents.find(d => d.docType === docType);
      if (!doc) {
        checklist.push({ message: `${docType} is missing`, severity: "High" });
      } else {
        const expiry = new Date(doc.expiryDate);
        if (expiry < today) {
          checklist.push({ message: `${docType} is expired`, severity: "Moderate" });
        } else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 30) {
          checklist.push({ message: `${docType} will expire soon`, severity: "Low" });
        }
      }
    });

    setAlerts(checklist);
  }, [documents]);

  return (
    <div style={{ padding: 16, backgroundColor: "#fff5e6", borderRadius: 8 }}>
      <h3>Compliance Risk Checklist</h3>
      {alerts.length === 0 ? (
        <p>All compliance items are up to date.</p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>
              <strong>{a.severity}:</strong> {a.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplianceChecklist;
