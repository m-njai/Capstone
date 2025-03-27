import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import ProjectOverview from "./ProjectOverview";
import TaskBoard from "../../components/TaskBoard";
import GanttTimeline from "../../components/GanttTimeline";
import CalendarView from "../../components/CalendarView";

const tabs = [
  { label: "Overview", key: "overview", roles: ["Admin", "Project Manager", "Builder"] },
  { label: "Kanban", key: "kanban", roles: ["Admin", "Project Manager", "Builder"] },
  { label: "Gantt", key: "gantt", roles: ["Admin", "Project Manager"] },
  { label: "Calendar", key: "calendar", roles: ["Admin", "Project Manager"] },
];

const ProjectDashboard = ({ projectId, role = "Admin" }) => {
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("Smart Timber Project");
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch tasks
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks", { params: { projectId } })
      .then((res) => setTasks(res.data));
  }, [projectId]);

  // Filter tabs based on user role
  const visibleTabs = tabs.filter((tab) => tab.roles.includes(role));

  // Generate PDF Report
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
    <div style={{ padding: 20 }}>
      <h2>{projectName} – Project Dashboard</h2>

      {/* Tabs Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                marginRight: 10,
                backgroundColor: activeTab === tab.key ? "#007bff" : "#e0e0e0",
                color: activeTab === tab.key ? "#fff" : "#000",
                padding: "8px 16px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {role === "Admin" && (
          <button onClick={generatePDF}>Download PDF Report</button>
        )}
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: 30 }}>
        {activeTab === "overview" && <ProjectOverview projectId={projectId} />}
        {activeTab === "kanban" && <TaskBoard projectId={projectId} role={role} />}
        {activeTab === "gantt" && <GanttTimeline projectId={projectId} />}
        {activeTab === "calendar" && <CalendarView projectId={projectId} />}
      </div>
    </div>
  );
};

export default ProjectDashboard;
