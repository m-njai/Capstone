// routes/subscribers.js
const express = require("express");
const router = express.Router();
const {
  addSubscriber,
  exportSubscribersCSV,
  listSubscribers,
} = require("../controllers/subscriberController");

router.post("/", addSubscriber);
router.get("/export", exportSubscribersCSV);
router.get("/list", listSubscribers);

module.exports = router;
