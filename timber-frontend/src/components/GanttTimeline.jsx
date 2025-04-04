import React, { useEffect, useState } from "react";
import axios from "axios";
import Gantt from "react-frappe-gantt";

const statusColorMap = {
  "Todo": "#ccc",
  "In Progress": "#fbc02d",
  "Done": "#4caf50"
};

const GanttTimeline = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/api/tasks", {
      params: { projectId }
    }).then(res => {
      const transformed = res.data.map(task => ({
        id: task.id,
        name: task.title,
        start: task.dueDate || new Date().toISOString().split('T')[0],  // Use dueDate as fallback if no start
        end: task.dueDate,
        progress: task.status === "Done" ? 100 : task.status === "In Progress" ? 50 : 0,
        custom_class: task.status.toLowerCase()
      }));
      setTasks(transformed);
    });
  }, [projectId]);

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Gantt Chart Timeline</h3>
      <Gantt
        tasks={tasks}
        viewMode="Week"
        onClick={task => alert(`Clicked ${task.name}`)}
        onDateChange={(task, start, end) => console.log("Rescheduled:", task.name, start, end)}
        customPopupHtml={task => `
          <div class="details-container">
            <h5>${task.name}</h5>
            <p>Status: ${task.custom_class}</p>
            <p>Start: ${task.start}</p>
            <p>End: ${task.end}</p>
          </div>
        `}
      />
    </div>
  );
};

export default GanttTimeline;
