import React, { useState } from "react";
import axios from "axios";

const ComplaintForm = ({ projectId }) => {
  const [form, setForm] = useState({ issue: "", submittedBy: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/complaints", {
      ...form,
      projectId
    });
    alert("Complaint submitted.");
    setForm({ issue: "", submittedBy: "" });
  };

  return (
    <div style={{ padding: 16, backgroundColor: "#fde2e2", borderRadius: 8 }}>
      <h3>Submit a Compliance Concern</h3>
      <input placeholder="Your Name" value={form.submittedBy} onChange={e => setForm({ ...form, submittedBy: e.target.value })} />
      <textarea placeholder="Describe the issue" value={form.issue} onChange={e => setForm({ ...form, issue: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ComplaintForm;
