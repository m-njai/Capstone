import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

function DocumentList() {
  const { user } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch documents on component load
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/compliance/documents', {
          headers: {
            'Authorization': `Bearer ${user.token}`,    // pass token if using auth header
            'x-user-id': user.id,                       // for our demo middleware
            'x-user-role': user.role
          }
        });
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error('Failed to load documents', err);
      }
    };
    if (user) fetchDocuments();
  }, [user]);

  // Handler to export CSV or PDF
  const handleExport = (format) => {
    window.open(`/api/compliance/export/${format}?token=${user.token}`, '_blank');
    // Here we append token as query or include in headers depending on auth setup.
    // Using window.open triggers download due to content-disposition set by server.
  };

  return (
    <div>
      <h2>Compliance Documents</h2>
      {/* If user can upload, show a button/link to upload page */}
      {(user.role === 'Admin' || user.role === 'Builder' || user.role === 'Supplier') && (
        <button onClick={() => navigate('/upload')}>+ Upload Document</button>
      )}
      {/* If user can export, show export buttons */}
      {(user.role === 'Admin' || user.role === 'Compliance Officer') && (
        <div style={{ margin: '10px 0' }}>
          <button onClick={() => handleExport('csv')}>Download CSV Report</button>
          <button onClick={() => handleExport('pdf')}>Download PDF Report</button>
        </div>
      )}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Document Type</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>FSC %</th>
            <th>Green Star Rating</th>
            { (user.role === 'Admin' || user.role === 'Compliance Officer') && <th>Actions</th> }
          </tr>
        </thead>
        <tbody>
          {documents.map(doc => (
            <tr key={doc.id}>
              <td>{doc.projectName}</td>
              <td>{doc.documentType}</td>
              <td>{doc.expiryDate}</td>
              <td>{doc.status}</td>
              <td>{doc.fscPercent}</td>
              <td>{doc.greenStarRating}</td>
              { (user.role === 'Admin' || user.role === 'Compliance Officer') && (
                <td>
                  {/* Compliance officers and admins can review documents that are not yet approved */}
                  {doc.status !== 'Approved' && doc.status !== 'Rejected' ? (
                    <button onClick={() => navigate(`/review/${doc.id}`)}>Review</button>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentList;
