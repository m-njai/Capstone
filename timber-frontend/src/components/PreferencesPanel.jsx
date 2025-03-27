import React, { useEffect, useState } from "react";
import axios from "axios";

const PreferencesPanel = ({ userId }) => {
  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    smsAlerts: false,
    theme: "light",
    twoFactorEnabled: false
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then(res => {
      const u = res.data;
      setPrefs({
        emailAlerts: u.notificationPrefs?.emailAlerts ?? true,
        smsAlerts: u.notificationPrefs?.smsAlerts ?? false,
        theme: u.theme || "light",
        twoFactorEnabled: u.twoFactorEnabled ?? false
      });
    });
  }, [userId]);

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setPrefs(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const savePreferences = async () => {
    try {
      await axios.put(`/api/users/${userId}/preferences`, {
        notificationPrefs: {
          emailAlerts: prefs.emailAlerts,
          smsAlerts: prefs.smsAlerts
        },
        theme: prefs.theme,
        twoFactorEnabled: prefs.twoFactorEnabled
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <h4>Preferences</h4>

      <div>
        <label>
          <input type="checkbox" name="emailAlerts" checked={prefs.emailAlerts} onChange={handleChange} />
          Email Alerts
        </label>
        <br />
        <label>
          <input type="checkbox" name="smsAlerts" checked={prefs.smsAlerts} onChange={handleChange} />
          SMS Alerts
        </label>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Theme:</label>
        <select name="theme" value={prefs.theme} onChange={handleChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>
          <input
            type="checkbox"
            name="twoFactorEnabled"
            checked={prefs.twoFactorEnabled}
            onChange={handleChange}
          />
          Enable 2FA (coming soon)
        </label>
      </div>

      <button onClick={savePreferences} style={{ marginTop: 10 }}>Save Preferences</button>
      {status === "success" && <p>Preferences saved!</p>}
      {status === "error" && <p style={{ color: "red" }}>Failed to save preferences</p>}
    </div>
  );
};

export default PreferencesPanel;
