// routes/assistant.js

const express = require("express");
const router = express.Router();
const { getAssistantReply } = require("../controllers/assistantController");

router.post("/", getAssistantReply);

module.exports = router;
