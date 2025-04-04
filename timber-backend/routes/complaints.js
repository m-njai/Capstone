// routes/complaints.js
const express = require("express");
const router = express.Router();
const {
  submitComplaint,
  getComplaints
} = require("../controllers/complaintsController");

router.post("/", submitComplaint);
router.get("/", getComplaints);

module.exports = router;

