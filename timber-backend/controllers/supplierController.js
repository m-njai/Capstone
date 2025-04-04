// controllers/supplierController.js
const Supplier = require("../models/Supplier");

// Sample in-memory orders (replace with DB later)
let orders = [
  { order_id: "1", supplier_id: "123", status: "Pending", expected_delivery: "2023-10-15" },
  { order_id: "2", supplier_id: "124", status: "Delivered", expected_delivery: "2023-10-10" },
];

// GET all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching suppliers" });
  }
};

// POST new supplier
const addSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.json({ message: "Supplier added successfully", supplier: newSupplier });
  } catch (error) {
    res.status(500).json({ error: "Error adding supplier" });
  }
};

// PUT update supplier
const updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) return res.status(404).json({ error: "Supplier not found" });
    res.json({ message: "Supplier updated successfully", supplier: updatedSupplier });
  } catch (error) {
    res.status(500).json({ error: "Error updating supplier" });
  }
};

// DELETE supplier
const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) return res.status(404).json({ error: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully", supplier: deletedSupplier });
  } catch (error) {
    res.status(500).json({ error: "Error deleting supplier" });
  }
};

// GET sample orders
const getOrders = (req, res) => {
  res.json({ orders });
};

// PUT update order status
const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((o) => o.order_id === id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = status;
  res.json({ message: "Order status updated", order });
};

module.exports = {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getOrders,
  updateOrderStatus,
};
