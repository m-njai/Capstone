const express = require("express");
const router = express.Router();

let orders = []; // Assume these are synced from your supply chain module

router.get("/score/:projectId", (req, res) => {
  const projectOrders = orders.filter(o => o.project_id === req.params.projectId);
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
});

module.exports = router;
