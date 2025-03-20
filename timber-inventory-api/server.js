const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(bodyParser.json());

// Sample inventory (Timber stock in cubic meters)
let inventory = [
    { id: 1, timber_type: "Pine", stock: 100, reorder_threshold: 20 },
    { id: 2, timber_type: "Oak", stock: 50, reorder_threshold: 10 },
    { id: 3, timber_type: "Cedar", stock: 30, reorder_threshold: 5 },
    { id: 4, timber_type: "Mahogany", stock: 20, reorder_threshold: 5 }
];

//  Get current inventory
app.get("/inventory", (req, res) => {
    res.json({ inventory });
});

// Update inventory stock
app.post("/update-inventory", (req, res) => {
    const { timber_id, new_stock } = req.body;

    let timber = inventory.find(item => item.id === timber_id);
    if (!timber) {
        return res.status(404).json({ error: "Timber type not found" });
    }

    timber.stock = new_stock;
    res.json({ message: "Inventory updated successfully", updated_inventory: inventory });
});

//  Get low stock alerts
app.get("/low-stock", (req, res) => {
    const lowStockItems = inventory.filter(item => item.stock <= item.reorder_threshold);
    res.json({ low_stock_items: lowStockItems });
});

// Start server
app.listen(PORT, () => {
    console.log(`Inventory API running on http://localhost:${PORT}`);
});