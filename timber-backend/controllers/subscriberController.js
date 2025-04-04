// controllers/subscriberController.js
const Subscriber = require("../models/Subscriber");
const { Parser } = require("json2csv");

const addSubscriber = async (req, res) => {
  const { name, email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(409).json({ error: "Already subscribed" });

    const subscriber = await Subscriber.create({ name, email });
    res.status(201).json({ message: "Subscribed successfully", subscriber });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const exportSubscribersCSV = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    const fields = ["name", "email", "subscribedAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(subscribers);

    res.header("Content-Type", "text/csv");
    res.attachment("subscribers.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: "Failed to export CSV" });
  }
};

const listSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
};

module.exports = {
  addSubscriber,
  exportSubscribersCSV,
  listSubscribers,
};
