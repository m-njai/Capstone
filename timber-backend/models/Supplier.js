// models/Supplier.js
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPerson: String,
  email: String,
  phone: String,
  materials: String,
  leadTimeDays: Number,
  notes: String,
  location: String,
  contact: String,
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
