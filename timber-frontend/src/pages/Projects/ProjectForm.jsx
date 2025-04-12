import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProjectForm = ({ projectId, onSuccess }) => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    status: '',
    team: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (projectId) fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setProject(response.data);
    } catch (err) {
      setStatusMessage('❌ Failed to load project.');
    }
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage('');

    try {
      if (projectId) {
        await axios.put(`/api/projects/${projectId}`, project);
        setStatusMessage('✅ Project updated successfully!');
      } else {
        await axios.post('/api/projects', project);
        setStatusMessage('✅ Project created successfully!');
      }
      onSuccess();
    } catch (err) {
      setStatusMessage('❌ Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <motion.form
        onSubmit={handleSubmit}
        style={formStyle}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={titleStyle}>
          {projectId ? 'Update Project' : 'Create New Project'}
        </h2>

        {/* Field Groups */}
        <motion.div layout style={{ marginBottom: '1rem' }}>
          <Label text="Project Name" />
          <Input name="name" value={project.name} onChange={handleChange} placeholder="e.g. Timber Warehouse Build" />
        </motion.div>

        <motion.div layout style={{ marginBottom: '1rem' }}>
          <Label text="Description" />
          <TextArea name="description" value={project.description} onChange={handleChange} placeholder="Brief project overview, goals, or scope..." />
        </motion.div>

        <motion.div layout style={{ marginBottom: '1rem' }}>
          <Label text="Start Date" />
          <Input type="date" name="startDate" value={project.startDate} onChange={handleChange} />
        </motion.div>

        <motion.div layout style={{ marginBottom: '1rem' }}>
          <Label text="Status" />
          <select name="status" value={project.status} onChange={handleChange} style={inputStyle}>
            <option value="">Select status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>
        </motion.div>

        <motion.div layout style={{ marginBottom: '1.5rem' }}>
          <Label text="Assigned Team" />
          <Input name="team" value={project.team} onChange={handleChange} placeholder="e.g. Alpha Site Team" />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          disabled={submitting}
          style={buttonStyle}
        >
          {submitting ? 'Submitting...' : projectId ? 'Update Project' : 'Create Project'}
        </motion.button>

        {/* Status Message */}
        {statusMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '1rem', color: statusMessage.includes('✅') ? 'green' : 'red' }}
          >
            {statusMessage}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default ProjectForm;

// Reusable Components
const Label = ({ text }) => <label style={labelStyle}>{text}</label>;

const Input = ({ ...props }) => (
  <input {...props} style={inputStyle} />
);

const TextArea = ({ ...props }) => (
  <textarea {...props} style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />
);

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: '#f3f4f6',
  minHeight: '100vh',
};

const formStyle = {
  backgroundColor: '#ffffff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
  maxWidth: '550px',
  width: '100%',
  fontFamily: 'Arial, sans-serif',
};

const titleStyle = {
  marginBottom: '1.5rem',
  fontSize: '1.6rem',
  color: '#1f2937',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.4rem',
  fontWeight: 600,
  color: '#374151',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '6px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  marginBottom: '0.5rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
};
