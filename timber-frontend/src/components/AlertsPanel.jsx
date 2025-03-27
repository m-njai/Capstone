import React, { useState, useEffect } from 'react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts on load
  useEffect(() => {
    // Replace with your backend API endpoint for fetching alerts
    fetch('/api/supplychain/alerts')
      .then((response) => response.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch((error) => console.error('Error fetching alerts:', error));
  }, []);

  return (
    <div style={{ padding: 16, background: '#f9f9f9', borderRadius: 8 }}>
      <h3>Alerts</h3>
      {alerts.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {alerts.map((alert, index) => (
            <li
              key={index}
              style={{
                background: '#ffeeba',
                marginBottom: 8,
                padding: 8,
                borderRadius: 4,
                border: '1px solid #f5c6cb',
              }}
            >
              <strong>{alert.title}</strong>
              <p>{alert.description}</p>
              <small>{new Date(alert.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts at the moment.</p>
      )}
    </div>
  );
};

export default AlertsPanel;
