const mongoose = require('mongoose');
const Role = require('../models/Role'); // Import Role model

// MongoDB connection URI
const mongoURI = 'mongodb://127.0.0.1:27017/timberDB';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB.');

    // Define roles
    const roles = [
      { name: 'Admin', description: 'Full system access. Manages users, settings, dashboards, approvals, financials, and compliance.' },
      { name: 'Builder', description: 'Uploads project documents, views tasks, accesses inventory, reviews schedules.' },
      { name: 'Supplier', description: 'Uploads compliance documents, views supply chain orders, and responds to requests.' },
      { name: 'Compliance Officer', description: 'Reviews compliance documents, adds comments, updates document status, and generates reports.' },
      { name: 'Finance Manager', description: 'Manages financial planning dashboards, transactions, and generates reports.' },
      { name: 'Project Manager', description: 'Manages project tasks (Kanban, Gantt), calendars, team activity, and task assignments.' },
      { name: 'Inventory Manager', description: 'Manages inventory levels, reorder alerts, and supplier deliveries.' },
      { name: 'Sustainability Officer', description: 'Reviews sustainability dashboards, scores, and ensures environmental compliance.' },
      { name: 'Supplier Manager', description: 'Manages supplier profiles, performance ratings, and order tracking.' },
      { name: 'CRM/Admin', description: 'Could handle lead management, newsletter campaigns, and customer interactions.' },
    ];

    // Seed roles into the database
    for (const role of roles) {
      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Role "${role.name}" added.`);
      } else {
        console.log(`Role "${role.name}" already exists.`);
      }
    }

    mongoose.connection.close();
    console.log('Database seeding complete.');
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));
