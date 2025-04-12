import React, { useState } from "react";
import axios from "axios";
import { Upload, Tag, ImagePlus } from "lucide-react";

const tagOptions = ["Residential", "Commercial", "Eco-friendly", "Renovation", "Interior"];

const ShowcaseUploadPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    tags: [],
    featured: false,
  });
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleTagToggle = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("featured", form.featured);

    form.tags.forEach((tag) => data.append("tags", tag));
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    // Optional: debug FormData
    // for (let [key, value] of data.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      await axios.post("/api/showcase", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
      console.error("❌ Upload failed:", error.response?.data || error.message);
      alert("An error occurred while uploading the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Showcase Your Project</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">
          Upload your completed construction work to feature it in our project gallery and attract future clients or collaborators.
        </p>
      </section>

      {/* Upload Form Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-blue-600" />
            Upload Project
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
                className="p-3 border rounded w-full"
              />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="p-3 border rounded w-full"
              />
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Project Description"
              rows={4}
              className="w-full p-3 border rounded"
            />

            {/* Tags */}
            <div>
              <p className="font-medium mb-2 flex items-center gap-2">
                <Tag size={16} /> Select Tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full border text-sm transition ${
                      form.tags.includes(tag)
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="scale-125"
              />
              <label className="text-sm">Mark this project as featured</label>
            </div>

            {/* File Upload */}
            <div>
              <label className="block mb-2 font-medium flex items-center gap-2">
                <ImagePlus size={18} />
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from(images).map((file, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="rounded-lg object-cover h-32 w-full border"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded text-lg transition"
            >
              {loading ? "Uploading..." : "Submit Project"}
            </button>

            {/* Success Message */}
            {success && (
              <p className="text-green-700 bg-green-100 text-center p-2 rounded mt-2">
                ✅ Project uploaded successfully!
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default ShowcaseUploadPage;
