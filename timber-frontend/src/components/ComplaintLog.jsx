import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintLog = () => {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaints");
        setComplaints(response.data.complaints || []);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Filter complaints based on input
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: 16, background: "#f9f9f9", borderRadius: 8 }}>
      <h3>Complaint Log</h3>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter complaints..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 16,
          border: "1px solid #ddd",
          borderRadius: 4,
        }}
      />

      {/* Complaint List */}
      {filteredComplaints.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredComplaints.map((complaint) => (
            <li
              key={complaint.id}
              style={{
                marginBottom: 12,
                padding: 12,
                borderRadius: 4,
                border: "1px solid #ddd",
                background: "#ffffff",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0" }}>{complaint.title}</h4>
              <p style={{ margin: "0 0 4px 0" }}>{complaint.description}</p>
              <small>
                Submitted by: {complaint.submittedBy} on{" "}
                {new Date(complaint.date).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints to display.</p>
      )}
    </div>
  );
};

export default ComplaintLog;
