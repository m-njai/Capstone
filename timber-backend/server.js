const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./db");
require("./scheduler"); // Import the scheduler

// Route imports
const authRoutes = require("./routes/auth");
const complianceRoutes = require("./routes/compliance");
const supplierRoutes = require("./routes/suppliers");
const tasksRoutes = require("./routes/tasks");
const inventoryTransactionsRoutes = require("./routes/inventoryTransactions");
const financialPlanningRoutes = require("./routes/financialPlanning");
const leadsRoutes = require("./routes/leads");
const projectShowcaseRoutes = require("./routes/projectShowcase");
const newsletterRoutes = require("./routes/newsletter");
const usersRoutes = require("./routes/users"); // Import Users routes
const invoiceRoutes = require("./routes/invoices");
const app = express();
const assistantRoutes = require("./routes/assistant");

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/supplierManagement")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api", inventoryTransactionsRoutes);
app.use("/api/financial-planning", financialPlanningRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/showcase", projectShowcaseRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/users", usersRoutes); // Mount Users routes
app.use("/api/invoices", invoiceRoutes);
app.use("/api/assistant", assistantRoutes);

// Root Route
app.get("/", (req, res) => res.send("API running..."));

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
