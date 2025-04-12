const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  status: { type: String, enum: ["Planned", "In Progress", "Completed"], default: "Planned" },
  startDate: { type: Date },
  assignedTeam: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);

