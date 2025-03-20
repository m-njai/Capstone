const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let suppliers = [
    { id: 1, name: "Timber NZ Ltd", location: "Auckland", contact: "info@timbernz.co.nz" },
    { id: 2, name: "EcoWood Suppliers", location: "Wellington", contact: "sales@ecowood.com" }
];

let orders = [];

// Get all suppliers
router.get("/", (req, res) => {
    res.json({ suppliers });
});

// Place an order
router.post("/order", (req, res) => {
    const { supplier_id, timber_type, quantity } = req.body;
    let supplier = suppliers.find(s => s.id === supplier_id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });

    let newOrder = {
        order_id: uuidv4(),
        supplier_id,
        supplier_name: supplier.name,
        timber_type,
        quantity,
        status: "Pending",
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    res.json({ message: "Order placed successfully", order: newOrder });
});

// Get all orders
router.get("/orders", (req, res) => {
    res.json({ orders });
});

module.exports = router;
