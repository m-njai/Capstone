import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const ProjectForm = ({ projectId, onSuccess }) => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    status: 'Planned',
    assignedTeam: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      axios.get(`/api/projects/${projectId}`)
        .then(res => {
          const fetched = res.data;
          setProject({
            title: fetched.title || '',
            description: fetched.description || '',
            location: fetched.location || '',
            startDate: fetched.startDate ? fetched.startDate.substring(0, 10) : '',
            status: fetched.status || 'Planned',
            assignedTeam: fetched.assignedTeam || ''
          });
        })
        .catch(err => {
          console.error("Fetch error:", err);
          toast.error('Failed to load project.');
        })
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...project,
      title: project.title.trim(),
      description: project.description.trim(),
      location: project.location.trim(),
      assignedTeam: project.assignedTeam.trim(),
      startDate: new Date(project.startDate)
    };

    try {
      if (projectId) {
        await axios.put(`/api/projects/${projectId}`, payload);
        toast.success('Project updated successfully!');
      } else {
        await axios.post('/api/projects', payload);
        toast.success('Project created successfully!');
        setProject({
          title: '', description: '', location: '', startDate: '',
          status: 'Planned', assignedTeam: ''
        });
      }
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Submit error:", error);
      const msg = error.response?.data?.message || 'Error occurred.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">{projectId ? 'Edit Project' : 'Create Project'}</h2>

      <label className="block text-sm font-medium">Title</label>
      <input
        name="title"
        value={project.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full p-2 border rounded"
        required
      />

      <label className="block text-sm font-medium">Description</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full p-2 border rounded"
        rows={3}
      />

      <label className="block text-sm font-medium">Location</label>
      <input
        name="location"
        value={project.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border rounded"
      />

      <label className="block text-sm font-medium">Start Date</label>
      <input
        name="startDate"
        type="date"
        value={project.startDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block text-sm font-medium">Status</label>
      <select
        name="status"
        value={project.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="Planned">Planned</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label className="block text-sm font-medium">Assigned Team</label>
      <input
        name="assignedTeam"
        value={project.assignedTeam}
        onChange={handleChange}
        placeholder="Assigned Team"
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
