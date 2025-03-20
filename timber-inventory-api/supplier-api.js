const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // For unique order IDs
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(bodyParser.json());

// Sample supplier data
let suppliers = [
    { id: 1, name: "Timber NZ Ltd", location: "Auckland", contact: "info@timbernz.co.nz" },
    { id: 2, name: "EcoWood Suppliers", location: "Wellington", contact: "sales@ecowood.com" },
    { id: 3, name: "Green Timber Solutions", location: "Christchurch", contact: "info@greentimber.com" }
];

// Sample orders (stores placed orders)
let orders = [];

// ✅ Get all suppliers
app.get("/suppliers", (req, res) => {
    res.json({ suppliers });
});

// ✅ Place an order
app.post("/order", (req, res) => {
    const { supplier_id, timber_type, quantity } = req.body;

    let supplier = suppliers.find(s => s.id === supplier_id);
    if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
    }

    let newOrder = {
        order_id: uuidv4(),
        supplier_id,
        supplier_name: supplier.name,
        timber_type,
        quantity,
        status: "Pending", // Default status
        timestamp: new Date().toISOString()
    };

    orders.push(newOrder);
    res.json({ message: "Order placed successfully", order: newOrder });
});

// ✅ Get all orders
app.get("/orders", (req, res) => {
    res.json({ orders });
});

// Start server
app.listen(PORT, () => {
    console.log(`Supplier Procurement API running on http://localhost:${PORT}`);
});
