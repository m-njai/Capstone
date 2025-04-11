import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { LayoutDashboard } from "lucide-react";

// Page components
import ProjectOverview from "./ProjectOverview";
import ProjectForm from "./ProjectForm";
import ProjectManager from "./ProjectManager";

// Shared components
import TaskBoard from "../../components/TaskBoard";
import CalendarView from "../../components/CalendarView";
import ProjectUploadForm from "../../components/ProjectUploadForm";
import ProjectGallery from "../../components/ProjectGallery";

// Photos
import photoHero1 from '../../photos/photo61.jpg';
import photoHero2 from '../../photos/photo29.jpg';

const tabs = [
  { label: "Overview", key: "overview", roles: ["Admin", "Project Manager", "Builder"] },
  { label: "Kanban", key: "kanban", roles: ["Admin", "Project Manager", "Builder"] },
  { label: "Calendar", key: "calendar", roles: ["Admin", "Project Manager"] },
  { label: "Manager", key: "manager", roles: ["Admin"] },
  { label: "Upload", key: "upload", roles: ["Admin"] },
  { label: "Form", key: "form", roles: ["Admin"] },
  { label: "Gallery", key: "gallery", roles: ["Admin", "Project Manager"] },
];

const ProjectDashboard = ({ role = "Admin" }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("Smart Timber Project");
  const [activeTab, setActiveTab] = useState("overview");
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [photoHero1, photoHero2];

  useEffect(() => {
    axios
      .get("/api/tasks", { params: { projectId } })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, [projectId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const visibleTabs = tabs.filter((tab) => tab.roles.includes(role));

  const generatePDF = () => {
    if (role !== "Admin") return alert("Access denied");

    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "Todo").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const done = tasks.filter((t) => t.status === "Done").length;
    const completion = total === 0 ? 0 : Math.round((done / total) * 100);

    const upcoming = [...tasks]
      .filter((t) => t.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Project Summary Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Project: ${projectName}`, 14, 30);
    doc.text(`Total Tasks: ${total}`, 14, 40);
    doc.text(`Todo: ${todo}`, 14, 46);
    doc.text(`In Progress: ${inProgress}`, 14, 52);
    doc.text(`Done: ${done}`, 14, 58);
    doc.text(`Completion: ${completion}%`, 14, 64);

    autoTable(doc, {
      startY: 72,
      head: [["Upcoming Tasks", "Due Date"]],
      body: upcoming.map((t) => [t.title, new Date(t.dueDate).toLocaleDateString()]),
    });

    doc.save("project_summary.pdf");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.5 }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 2rem",
        backgroundColor: "#1f2937",
        color: "#fff"
      }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{projectName} Dashboard</h1>
        <button onClick={() => navigate("/dashboard")} style={{ padding: "0.5rem 1rem", backgroundColor: "#3b82f6", color: "#fff", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LayoutDashboard /> Home
        </button>
      </header>

      {/* Hero Banner */}
      <section style={{
        padding: "5rem 2rem",
        textAlign: "center",
        backgroundImage: `url(${heroImages[currentHero]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        transition: "background-image 1s ease-in-out",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1
        }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "2.25rem" }}>
            Managing: <span style={{ fontWeight: "bold" }}>{projectName}</span>
          </h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "1rem auto" }}>
            Stay organized with visual tools — track, schedule, and showcase your timber project.
          </p>
        </div>
      </section>

      {/* Tab Buttons */}
      <main className="p-6">
        <div className="flex gap-2 mb-4">
          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: activeTab === tab.key ? "#3b82f6" : "#e5e7eb",
                color: activeTab === tab.key ? "#fff" : "#111827",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && <ProjectOverview projectId={projectId} />}
          {activeTab === "kanban" && <TaskBoard projectId={projectId} role={role} />}
          {activeTab === "calendar" && <CalendarView projectId={projectId} />}
          {activeTab === "manager" && <ProjectManager projectId={projectId} />}
          {activeTab === "upload" && <ProjectUploadForm projectId={projectId} />}
          {activeTab === "form" && <ProjectForm projectId={projectId} />}
          {activeTab === "gallery" && <ProjectGallery projectId={projectId} />}
        </div>
      </main>
    </div>
  );
};

export default ProjectDashboard;
