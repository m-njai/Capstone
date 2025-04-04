import React, { useState } from "react";
import UserProfile from "./UserProfile"; // Corrected path to pages/UserProfile.jsx
import PasswordSettings from "../components/PasswordSettings";
import AccountInfo from "../components/AccountInfo";
import PreferencesPanel from "../components/PreferencesPanel";

const SettingsDashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div style={{ padding: 20 }}>
      <h2>Settings</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("security")}>Password</button>
        <button onClick={() => setActiveTab("account")}>Account Info</button>
        <button onClick={() => setActiveTab("prefs")}>Preferences</button>
      </div>

      <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 6 }}>
        {activeTab === "profile" && <UserProfile userId={userId} />}
        {activeTab === "security" && <PasswordSettings userId={userId} />}
        {activeTab === "account" && <AccountInfo userId={userId} />}
        {activeTab === "prefs" && <PreferencesPanel userId={userId} />}
      </div>
    </div>
  );
};

export default SettingsDashboard;
