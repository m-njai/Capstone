// routes/suppliers.js
const express = require("express");
const router = express.Router();
const {
  getAllSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getOrders,
  updateOrderStatus,
} = require("../controllers/supplierController");

// Supplier CRUD
router.get("/", getAllSuppliers);
router.post("/", addSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

// Sample Order endpoints
router.get("/orders", getOrders);
router.put("/orders/:id/status", updateOrderStatus);

module.exports = router;
