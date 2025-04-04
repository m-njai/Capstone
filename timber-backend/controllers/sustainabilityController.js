// controllers/sustainabilityController.js

// Simulated orders (for demo/testing — should come from a DB in real use)
let orders = [
    // Example structure:
    // { project_id: "P001", isFSC: true },
    // { project_id: "P001", isFSC: false },
    // { project_id: "P002", isFSC: true }
  ];
  
  const getSustainabilityScore = (req, res) => {
    const { projectId } = req.params;
    const projectOrders = orders.filter(order => order.project_id === projectId);
  
    const total = projectOrders.length;
    const fscCount = projectOrders.filter(order => order.isFSC).length;
  
    const fscPercent = total === 0 ? 0 : (fscCount / total) * 100;
  
    let rating = "Unrated";
    if (fscPercent >= 75) rating = "Green - Gold";
    else if (fscPercent >= 50) rating = "Green - Silver";
    else if (fscPercent >= 25) rating = "Green - Bronze";
  
    res.json({
      total,
      fscCertified: fscCount,
      fscPercent: +fscPercent.toFixed(2),
      rating,
    });
  };
  
  module.exports = {
    getSustainabilityScore,
    // You can also add logic to sync/update `orders` from real sources later
  };
  