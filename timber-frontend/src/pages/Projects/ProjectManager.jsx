import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('/api/projects');
    setProjects(response.data);
  };

  const handleDelete = async (projectId) => {
    await axios.delete(`/api/projects/${projectId}`);
    fetchProjects();
  };

  return (
    <div>
      <h1>Project Dashboard</h1>
      <button onClick={() => {/* Navigate to project creation form */}}>Create New Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button onClick={() => {/* Navigate to project edit form */}}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
