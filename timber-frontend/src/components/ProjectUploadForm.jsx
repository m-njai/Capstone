import React, { useState } from "react";
import axios from "axios";

const tagOptions = ["Residential", "Commercial", "Eco-friendly", "Renovation", "Interior"];

const ProjectUploadForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    tags: [],
    featured: false,
  });
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle tag selection and toggling
  const handleTagToggle = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => setImages(e.target.files);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in form) {
      if (key === "tags") form.tags.forEach((tag) => data.append("tags", tag));
      else data.append(key, form[key]);
    }
    for (let file of images) data.append("images", file);

    try {
      await axios.post("/api/showcase", data);
      setSuccess(true);
      setForm({
        title: "",
        description: "",
        location: "",
        tags: [],
        featured: false,
      });
      setImages([]);
    } catch (error) {
      console.error("Error uploading project:", error);
      alert("An error occurred while uploading the project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h3>Upload Project</h3>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />

      {/* Tags Section */}
      <div>
        <p>Tags:</p>
        {tagOptions.map((tag) => (
          <label key={tag} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={form.tags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
            />
            {tag}
          </label>
        ))}
      </div>

      {/* Featured Checkbox */}
      <label>
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        Mark as Featured
      </label>

      {/* File Upload */}
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>

      {/* Success Message */}
      {success && <p>Project uploaded successfully!</p>}
    </form>
  );
};

export default ProjectUploadForm;
