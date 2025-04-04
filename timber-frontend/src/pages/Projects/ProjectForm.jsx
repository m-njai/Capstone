import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectForm = ({ projectId, onSuccess }) => {
  const [project, setProject] = useState({ name: '', description: '' });

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    const response = await axios.get(`/api/projects/${projectId}`);
    setProject(response.data);
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectId) {
      await axios.put(`/api/projects/${projectId}`, project);
    } else {
      await axios.post('/api/projects', project);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={project.name}
        onChange={handleChange}
        placeholder="Project Name"
        required
      />
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="Project Description"
        required
      />
      <button type="submit">{projectId ? 'Update' : 'Create'} Project</button>
    </form>
  );
};

export default ProjectForm;
