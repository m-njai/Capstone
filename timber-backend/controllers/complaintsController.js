// controllers/complaintsController.js
const { v4: uuidv4 } = require("uuid");

let complaints = [];

const submitComplaint = (req, res) => {
  const { projectId, issue, submittedBy } = req.body;

  const newComplaint = {
    id: uuidv4(),
    projectId,
    issue,
    submittedBy,
    status: "Open",
    submittedAt: new Date().toISOString()
  };

  complaints.push(newComplaint);
  res.json({ message: "Complaint submitted", complaint: newComplaint });
};

const getComplaints = (req, res) => {
  res.json({ complaints });
};

module.exports = { submitComplaint, getComplaints };
