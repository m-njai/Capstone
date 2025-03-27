import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const TaskBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const statuses = ["To Do", "In Progress", "Done"];

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  // Handle drag-and-drop updates
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const updatedTask = tasks.find((task) => task.id === draggableId);
    updatedTask.status = destination.droppableId;

    try {
      await axios.put(`/api/tasks/${draggableId}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Group tasks by their statuses
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  return (
    <div>
      <h1>Task Board</h1>
      <div style={{ display: "flex", gap: "1rem", marginTop: 20 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "1rem",
                    width: "30%",
                    borderRadius: 8,
                  }}
                >
                  <h2>{status}</h2>
                  {groupedTasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: "white",
                            marginBottom: 10,
                            padding: 10,
                            borderRadius: 6,
                            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                          }}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          {task.dueDate && (
                            <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskBoard;
