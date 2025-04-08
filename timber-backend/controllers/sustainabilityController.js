const Order = require("../models/Order");

exports.getSustainabilityScore = async (req, res) => {
  try {
    const { projectId } = req.params;

    const projectOrders = await Order.find({ project_id: projectId });
    const total = projectOrders.length;
    const fscCount = projectOrders.filter(o => o.isFSC).length;

    const fscPercent = total === 0 ? 0 : (fscCount / total) * 100;

    let rating = "Unrated";
    if (fscPercent >= 75) rating = "Green - Gold";
    else if (fscPercent >= 50) rating = "Green - Silver";
    else if (fscPercent >= 25) rating = "Green - Bronze";

    res.json({
      total,
      fscCertified: fscCount,
      fscPercent,
      rating,
    });
  } catch (err) {
    console.error("Error calculating sustainability score:", err);
    res.status(500).json({ error: "Server error calculating score" });
  }
};
