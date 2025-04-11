import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Truck } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        if (!API_URL.startsWith('http')) {
          throw new Error('Invalid API URL');
        }

        const res = await fetch(`${API_URL}/api/supplychain/alerts`);
        const contentType = res.headers.get('content-type');

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format: Expected JSON');
        }

        const data = await res.json();

        const sanitizedAlerts = (data.alerts || []).map((alert, index) => ({
          id: alert.id || index,
          title: alert?.title || 'Untitled Alert',
          description: alert?.description || 'No description provided.',
          timestamp: alert?.timestamp || new Date().toISOString(),
          type: alert?.type || 'info',
        }));

        setAlerts(sanitizedAlerts);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError(err.message || 'Failed to load alerts.');
      }
    };

    fetchAlerts();
  }, [API_URL]);

  const getIconByType = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-yellow-600" size={18} />;
      case 'delay': return <Clock className="text-red-600" size={18} />;
      case 'delivery': return <Truck className="text-blue-600" size={18} />;
      default: return <AlertTriangle className="text-gray-600" size={18} />;
    }
  };

  return (
    <section
      className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg"
      aria-label="Alert Notifications"
      aria-live="polite"
    >
      <h3 className="text-xl font-semibold mb-4 text-yellow-800">📢 System Alerts</h3>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : alerts.length > 0 ? (
        <ul className="space-y-4">
          {alerts.map((alert) => {
            const date = new Date(alert.timestamp);
            return (
              <li
                key={alert.id}
                className="bg-white border-l-4 border-yellow-400 p-4 rounded shadow flex items-start gap-3"
              >
                <div className="pt-1">{getIconByType(alert.type)}</div>
                <div>
                  <h4 className="font-semibold text-yellow-900">{alert.title}</h4>
                  <p className="text-sm text-gray-800">{alert.description}</p>
                  <small className="block text-xs mt-1 text-gray-500">
                    {isNaN(date) ? 'Invalid Date' : date.toLocaleString()}
                  </small>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600">No alerts at the moment.</p>
      )}
    </section>
  );
};

export default AlertsPanel;
