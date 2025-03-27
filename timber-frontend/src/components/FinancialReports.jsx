import React, { useEffect, useState } from "react";
import axios from "axios";

const FinancialReports = () => {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  // Fetch the list of projects
  useEffect(() => {
    axios.get("/api/projects").then((res) => {
      setProjects(res.data || []); // Ensure the data is assigned properly
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Financial Reports</h2>

      {/* Project Filter */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={{ padding: "6px", marginRight: "10px" }}
        >
          <option value="">All Projects</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Download Buttons */}
        <button
          onClick={() =>
            window.open(`/api/finance/reports/monthly/csv?projectId=${projectId}`)
          }
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download CSV
        </button>
        <button
          onClick={() =>
            window.open(`/api/finance/reports/monthly/pdf?projectId=${projectId}`)
          }
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default FinancialReports;
