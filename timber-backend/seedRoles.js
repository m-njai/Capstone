// seedRoles.js
const mongoose = require('mongoose');
const Role = require('./models/Role');
require('dotenv').config();

const roles = [
  { name: 'Admin', description: 'Full access to all features' },
  { name: 'Builder', description: 'Manages construction tasks' },
  { name: 'Supplier', description: 'Handles timber/materials supply' },
  { name: 'Compliance Officer', description: 'Oversees legal and safety standards' },
  { name: 'Finance Manager', description: 'Manages budgeting and finances' },
  { name: 'Project Manager', description: 'Oversees project execution' },
  { name: 'Inventory Manager', description: 'Tracks material inventory' },
  { name: 'Sustainability Officer', description: 'Manages eco-friendly practices' },
  { name: 'Supplier Manager', description: 'Handles supplier relationships' },
  { name: 'CRM/Admin', description: 'Handles customer relationship and admin support' }
];

async function seedRoles() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/supplierManagement");
    console.log("Connected to DB");

    await Role.deleteMany(); // clear old roles
    await Role.insertMany(roles);
    console.log("Roles inserted successfully.");

    mongoose.disconnect();
  } catch (err) {
    console.error("Failed to seed roles:", err);
    process.exit(1);
  }
}

seedRoles();
