import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const locales = {
  "en-NZ": require("date-fns/locale/en-NZ")
};

const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales
});

const statusColorMap = {
  "Todo": "#ccc",
  "In Progress": "#fbc02d",
  "Done": "#4caf50"
};

const CalendarView = ({ projectId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks", {
      params: { projectId }
    }).then(res => {
      const tasks = res.data;
      const mapped = tasks
        .filter(t => t.dueDate)
        .map(task => ({
          id: task.id,
          title: task.title,
          start: new Date(task.dueDate),
          end: new Date(task.dueDate),
          status: task.status
        }));
      setEvents(mapped);
    });
  }, [projectId]);

  const eventStyleGetter = (event) => {
    const backgroundColor = statusColorMap[event.status] || "#ddd";
    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        color: "#333",
        border: "none",
        padding: "4px"
      }
    };
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Project Task Calendar</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        views={["month", "week"]}
      />
    </div>
  );
};

export default CalendarView;
