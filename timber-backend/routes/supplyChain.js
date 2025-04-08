// routes/supplychain.js
const express = require('express');
const router = express.Router();

router.get('/alerts', (req, res) => {
  const alerts = [
    {
      id: 1,
      title: 'Low Inventory Warning',
      description: 'Timber stock is below threshold.',
      timestamp: new Date(),
    },
    {
      id: 2,
      title: 'Delayed Delivery',
      description: 'Supplier XYZ is behind schedule.',
      timestamp: new Date(),
    },
  ];

  res.json({ alerts });
});

module.exports = router;
