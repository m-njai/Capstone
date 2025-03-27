const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let complaints = [];

router.post("/", (req, res) => {
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
});

router.get("/", (req, res) => {
  res.json({ complaints });
});

module.exports = router;
Mount it:
app.use("/api/complaints", require("./routes/complaints"));
