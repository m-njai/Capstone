import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplianceUpload = ({ projectId }) => {
  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState({ docType: "", expiryDate: "", file: null });

  const fetchDocs = async () => {
    const res = await axios.get("/api/compliance");
    setDocuments(res.data.documents);
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", form.file);
    formData.append("projectId", projectId);
    formData.append("docType", form.docType);
    formData.append("expiryDate", form.expiryDate);

    await axios.post("/api/compliance/upload", formData);
    fetchDocs();
  };

  return (
    <div>
      <h3>Compliance Document Upload</h3>
      <form onSubmit={handleSubmit}>
        <select name="docType" value={form.docType} onChange={(e) => setForm({ ...form, docType: e.target.value })} required>
          <option value="">Select Document Type</option>
          <option value="Site Safety Plan">Site Safety Plan</option>
          <option value="Environmental Consent">Environmental Consent</option>
          <option value="Building Permit">Building Permit</option>
        </select>
        <input type="date" name="expiryDate" onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} required />
        <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} required />
        <button type="submit">Upload</button>
      </form>

      <h4>Uploaded Documents</h4>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
          {doc.docType} — <strong>{doc.status}</strong> — <a href={`/${doc.filePath}`} target="_blank">View</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplianceUpload;
