import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const statuses = ["To Do", "In Progress", "Done"];

  // Fetch tasks from the API
  const fetchTasks = async () => {
    if (!projectId) {
      console.warn("TaskBoard: projectId is undefined. Cannot fetch tasks.");
      return;
    }

    try {
      const response = await axios.get(`/api/projects/${projectId}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message || error);
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
    if (!updatedTask) return;

    updatedTask.status = destination.droppableId;

    try {
      await axios.put(`/api/tasks/${draggableId}`, updatedTask);
      fetchTasks(); // refresh
    } catch (error) {
      console.error("Error updating task status:", error.message || error);
    }
  };

  // Group tasks by status
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Task Board</h1>
      {!projectId ? (
        <p className="text-red-600">Project ID is missing. Cannot load tasks.</p>
      ) : (
        <div className="flex gap-4 mt-4">
          <DragDropContext onDragEnd={onDragEnd}>
            {statuses.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-100 p-4 w-1/3 rounded-lg"
                  >
                    <h2 className="font-bold text-lg mb-2">{status}</h2>
                    {groupedTasks[status].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-3 mb-3 rounded-md shadow"
                          >
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            {task.dueDate && (
                              <small className="block text-xs text-gray-400 mt-1">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </small>
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
      )}
    </div>
  );
};

export default TaskBoard;
