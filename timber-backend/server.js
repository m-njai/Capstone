const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db"); // Import MongoDB connection
require("dotenv").config();

// Import API routes
const inventoryRoutes = require("./routes/inventory");
const supplierRoutes = require("./routes/suppliers");
const taskRoutes = require("./routes/tasks");
const costEstimationRoutes = require("./routes/costEstimation");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register API Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/estimate-cost", costEstimationRoutes);

// Root Endpoint
app.get("/", (req, res) => {
    res.send(" Timber Construction API is Running!");
});

// Handle 404 Errors
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint Not Found" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


