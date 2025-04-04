import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSubscriberDashboard = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios.get("/api/newsletter/export") // used to trigger download
      .catch(err => console.error("CSV endpoint not triggered here"));

    axios.get("/api/newsletter/list").then(res => {
      setSubscribers(res.data);
    });
  }, []);

  const downloadCSV = () => {
    window.open("/api/newsletter/export", "_blank");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Newsletter Subscribers</h3>
      <button onClick={downloadCSV}>Download CSV</button>
      <table border="1" cellPadding="8" style={{ marginTop: 15, width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map(sub => (
            <tr key={sub._id}>
              <td>{sub.name}</td>
              <td>{sub.email}</td>
              <td>{new Date(sub.subscribedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSubscriberDashboard;
