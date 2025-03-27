import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ projectId, taskId, onSuccess }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignee: "",
    status: "To Do",
  });

  // Fetch task details if editing (taskId is provided)
  useEffect(() => {
    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`/api/tasks/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // Handle form submission for both creating and updating a task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (taskId) {
        // Update task
        await axios.put(`/api/tasks/${taskId}`, task);
      } else {
        // Create new task
        await axios.post(`/api/projects/${projectId}/tasks`, {
          ...task,
          projectId,
        });
      }
      onSuccess();
      setTask({
        title: "",
        description: "",
        dueDate: "",
        assignee: "",
        status: "To Do",
      });
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>{taskId ? "Edit Task" : "Create Task"}</h3>
      <input
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <input
        name="dueDate"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
      />
      <input
        name="assignee"
        placeholder="Assignee"
        value={task.assignee}
        onChange={handleChange}
      />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit">{taskId ? "Update" : "Add"} Task</button>
    </form>
  );
};

export default TaskForm;
