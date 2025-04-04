// controllers/estimationController.js
const timberPrices = { Pine: 350, Oak: 750 };

const estimateTimberCost = (req, res) => {
  const { timber_type, length_m, width_m, height_m, quantity } = req.body;

  if (!timberPrices[timber_type]) {
    return res.status(400).json({ error: "Invalid timber type." });
  }

  const volume = length_m * width_m * height_m * quantity;
  const pricePerM3 = timberPrices[timber_type];
  const totalCost = volume * pricePerM3;

  res.json({
    total_volume_m3: volume.toFixed(2),
    price_per_m3: pricePerM3,
    total_cost: totalCost.toFixed(2),
  });
};

module.exports = { estimateTimberCost };
