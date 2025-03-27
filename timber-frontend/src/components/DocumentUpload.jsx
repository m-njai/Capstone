import React, { useState, useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

function DocumentUpload() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Form state
  const [projectName, setProjectName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [fscPercent, setFscPercent] = useState('');
  const [greenStarRating, setGreenStarRating] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const payload = { projectName, documentType, expiryDate, fscPercent, greenStarRating };
    try {
      const res = await fetch('/api/compliance/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'x-user-id': user.id,
          'x-user-role': user.role
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setMessage('Document uploaded successfully.');
        // Optionally, navigate back to list or reset form
        navigate('/documents');
      } else {
        const errData = await res.json();
        setMessage(`Upload failed: ${errData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error uploading document:', err);
      setMessage('Upload failed: Network or server error');
    }
  };

  return (
    <div>
      <h2>Upload Compliance Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:{" "}
            <input 
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>Document Type:{" "}
            <input 
              type="text" 
              value={documentType} 
              onChange={(e) => setDocumentType(e.target.value)} 
              placeholder="e.g., Building Permit" 
              required 
            />
          </label>
        </div>
        <div>
          <label>Expiry Date:{" "}
            <input 
              type="date" 
              value={expiryDate} 
              onChange={(e) => setExpiryDate(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>FSC %:{" "}
            <input 
              type="number" 
              value={fscPercent} 
              onChange={(e) => setFscPercent(e.target.value)} 
              placeholder="0-100" 
            />
          </label>
        </div>
        <div>
          <label>Green Star Rating:{" "}
            <input 
              type="number" 
              value={greenStarRating} 
              onChange={(e) => setGreenStarRating(e.target.value)} 
              placeholder="1-6" 
            />
          </label>
        </div>
        {/* In a real form, include a file input: e.g., <input type="file" .../> to upload the actual document */}
        <button type="submit">Submit Document</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DocumentUpload;
