const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  images: [String], // image URLs or paths
  tags: [String], // e.g., ["Residential", "Eco-friendly"]
  featured: { type: Boolean, default: false }, // Flag for featured projects
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProjectShowcase", ProjectSchema);
