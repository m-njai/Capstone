// routes/suppliers.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier'); // Import Supplier model

// Fetch all suppliers
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching suppliers' });
  }
});

// Add a new supplier
router.post('/suppliers', async (req, res) => {
  const supplierData = req.body;

  try {
    const newSupplier = new Supplier(supplierData);
    await newSupplier.save();
    res.json({ message: 'Supplier added successfully', supplier: newSupplier });
  } catch (error) {
    res.status(500).json({ error: 'Error adding supplier' });
  }
});

// Update an existing supplier
router.put('/suppliers/:id', async (req, res) => {
  const supplierId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(supplierId, updatedData, { new: true });
    if (!updatedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
  } catch (error) {
    res.status(500).json({ error: 'Error updating supplier' });
  }
});

// Delete a supplier
router.delete('/suppliers/:id', async (req, res) => {
  const supplierId = req.params.id;

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
    if (!deletedSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted successfully', supplier: deletedSupplier });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting supplier' });
  }
});

router.put("/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const order = orders.find(o => o.order_id === id);
    if (!order) return res.status(404).json({ error: "Order not found" });
  
    order.status = status;
    res.json({ message: "Order status updated", order });
  });
  
module.exports = router;
