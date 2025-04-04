import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectOverview = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/api/tasks", {
      params: { projectId }
    }).then(res => setTasks(res.data));
  }, [projectId]);

  const total = tasks.length;
  const counts = {
    todo: tasks.filter(t => t.status === "Todo").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    done: tasks.filter(t => t.status === "Done").length,
  };
  const completion = total === 0 ? 0 : Math.round((counts.done / total) * 100);

  const today = new Date();
  const dueSoon = tasks
    .filter(t => t.dueDate && new Date(t.dueDate) >= today)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const recent = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Project Overview</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ background: "#eee", padding: 10, borderRadius: 8 }}>
          <h4>Task Summary</h4>
          <p>Total: {total}</p>
          <p>Todo: {counts.todo}</p>
          <p>In Progress: {counts.inProgress}</p>
          <p>Done: {counts.done}</p>
          <p>Completion: {completion}%</p>
        </div>

        <div style={{ background: "#f9f9f9", padding: 10, borderRadius: 8 }}>
          <h4>Upcoming Deadlines</h4>
          <ul>
            {dueSoon.map(task => (
              <li key={task.id}>
                {task.title} — {new Date(task.dueDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: "#f0f0f0", padding: 10, borderRadius: 8 }}>
          <h4>Recent Activity</h4>
          <ul>
            {recent.map(task => (
              <li key={task.id}>{task.title} — Created {new Date(task.createdAt).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
