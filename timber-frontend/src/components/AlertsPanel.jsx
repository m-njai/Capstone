import React, { useState, useEffect } from 'react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // Validate API URL
        if (!API_URL.startsWith('http')) {
          throw new Error('Invalid API URL');
        }

        const res = await fetch(`${API_URL}/api/supplychain/alerts`);
        const contentType = res.headers.get('content-type');

        // Check for response errors
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format: Expected JSON');
        }

        const data = await res.json();

        // Sanitize and validate alerts data
        const sanitizedAlerts = (data.alerts || []).map((alert, index) => ({
          id: alert.id || index, // Use alert id or fallback to index
          title: alert?.title || 'Untitled Alert',
          description: alert?.description || 'No description provided.',
          timestamp: alert?.timestamp || new Date().toISOString(),
        }));

        setAlerts(sanitizedAlerts);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError(err.message || 'Failed to load alerts.');
      }
    };

    fetchAlerts();
  }, [API_URL]);

  return (
    <section
      className="bg-yellow-100 border border-yellow-300 p-4 rounded-md"
      aria-label="Alert Notifications"
      aria-live="polite"
    >
      <h3 className="text-lg font-semibold mb-2 text-yellow-800">Alerts</h3>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : alerts.length > 0 ? (
        <ul className="space-y-3">
          {alerts.map((alert) => {
            const date = new Date(alert.timestamp);
            return (
              <li
                key={alert.id}
                className="bg-yellow-200 p-3 rounded shadow text-sm text-yellow-900"
              >
                <strong>{alert.title}</strong>
                <p>{alert.description}</p>
                <small className="text-xs block mt-1 italic text-gray-700">
                  {isNaN(date) ? 'Invalid Date' : date.toLocaleString()}
                </small>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">No alerts at the moment.</p>
      )}

      {import.meta.env.MODE === 'development' && (
        <p className="text-xs text-gray-400 mt-2">
          [Dev Mode] Endpoint: <code>{`${API_URL}/api/supplychain/alerts`}</code>
        </p>
      )}
    </section>
  );
};

export default AlertsPanel;
