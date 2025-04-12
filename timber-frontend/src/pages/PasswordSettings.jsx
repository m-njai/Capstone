import React, { useState, useEffect } from "react";
import { LayoutDashboard, User, ShieldCheck, Settings, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
import PasswordSettings from "../components/PasswordSettings";
import AccountInfo from "../components/AccountInfo";
import PreferencesPanel from "../components/PreferencesPanel";
import photoHero1 from "../photos/photo4.jpg";
import photoHero2 from "../photos/photo16.jpg";

const tabs = [
  { key: "profile", label: "Profile", icon: <User size={16} /> },
  { key: "security", label: "Password", icon: <ShieldCheck size={16} /> },
  { key: "account", label: "Account Info", icon: <Settings size={16} /> },
  { key: "prefs", label: "Preferences", icon: <SlidersHorizontal size={16} /> },
];

const SettingsDashboard = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentHero, setCurrentHero] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();
  const heroImages = [photoHero1, photoHero2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setAvatarUrl(res.data.avatar);
      } catch (err) {
        console.error("Error fetching user avatar:", err);
      }
    };
    fetchAvatar();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="rounded-full w-10 h-10 object-cover border-2 border-blue-300"
            />
          ) : (
            <div className="bg-blue-300 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
              SG
            </div>
          )}
          <h1 className="text-xl font-semibold">Settings Panel</h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-300 border border-blue-300 px-3 py-1 rounded hover:bg-blue-300 hover:text-gray-900 transition"
          >
            Home
          </button>
        </div>
      </header>

      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          backgroundImage: `url(${heroImages[currentHero]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transition: "background-image 1s ease-in-out",
          position: "relative",
          animation: "fadeIn 1.5s ease-in",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Profile"
              className="mx-auto mb-4 rounded-full w-28 h-28 object-cover border-4 border-white shadow-md"
            />
          )}
          <h2 style={{ fontSize: "2.25rem", fontWeight: 600 }}>Customize Your SmartGrain Experience</h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "650px", margin: "1rem auto" }}>
            Manage profile details, security settings, and personal preferences.
          </p>
        </div>
      </section>

      <main className="px-6 py-10 max-w-5xl mx-auto w-full">
        <div className="flex gap-3 flex-wrap mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition shadow-sm ${
                activeTab === tab.key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          {activeTab === "profile" && <UserProfile userId={userId} />}
          {activeTab === "security" && <PasswordSettings userId={userId} />}
          {activeTab === "account" && <AccountInfo userId={userId} />}
          {activeTab === "prefs" && <PreferencesPanel userId={userId} />}
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6 text-center mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} SmartGrain Systems</p>
      </footer>
    </div>
  );
};

export default SettingsDashboard;
