import React, { useState, useEffect } from 'react';

const Task = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from an API or database
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        // Replace with your API call
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Task;