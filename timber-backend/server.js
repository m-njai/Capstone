const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./db");
require("./scheduler"); // Import the scheduler
require("./firebaseAdmin"); // Firebase Admin SDK init

const app = express();

// Middleware
app.use(cors()); // Must come before routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Static files

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/supplierManagement")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// ✅ Route imports
const authRoutes = require("./routes/auth");
const complianceRoutes = require("./routes/compliance");
const supplierRoutes = require("./routes/suppliers");
const tasksRoutes = require("./routes/tasks");
const inventoryTransactionsRoutes = require("./routes/inventory");
const financialPlanningRoutes = require("./routes/financialPlanning");
const leadsRoutes = require("./routes/leads");
const projectShowcaseRoutes = require("./routes/projectShowcase");
const newsletterRoutes = require("./routes/subscribers");
const usersRoutes = require("./routes/users");
const invoiceRoutes = require("./routes/invoices");
const assistantRoutes = require("./routes/assistant");
const rolesRoutes = require("./routes/roles");
const financeRoutes = require("./routes/finance");

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", authRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api", inventoryTransactionsRoutes);
app.use("/api/financial-planning", financialPlanningRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/projects", projectShowcaseRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/assistant", assistantRoutes);
app.use("/api/roles", rolesRoutes); // This is your roles endpoint
app.use("/api/finance", financeRoutes);
// Root test route
app.get("/", (req, res) => res.send("API running..."));
app.post('/api/auth/login', (req, res) => {
  // Handle login logic
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
