// controllers/assistantController.js

const getAssistantReply = (req, res) => {
    const { message } = req.body;
    const msg = message.toLowerCase();
  
    let response = "I'm not sure how to help with that yet.";
  
    if (msg.includes("compliance")) {
      response = "You can upload compliance documents in the Compliance tab and track status.";
    } else if (msg.includes("suppliers") || msg.includes("timber")) {
      response = "You can view and rate suppliers in the Supply Chain section.";
    } else if (msg.includes("project") && msg.includes("status")) {
      response = "Visit the Project Dashboard to see project summaries, deadlines, and progress.";
    } else if (msg.includes("how to")) {
      response = "You can find step-by-step guidance under each module’s Help section.";
    }
  
    res.json({ reply: response });
  };
  
  module.exports = { getAssistantReply };
  