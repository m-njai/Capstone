import React, { useEffect, useState } from "react";
import axios from "axios";

const SupplierManager = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    materials: "",
    leadTimeDays: "",
    notes: "",
    contact: ""
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/suppliers");
      setSuppliers(res.data.suppliers || res.data); // Support either structure
    } catch (err) {
      alert("Error fetching suppliers.");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.contact || !form.location) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editMode && editId) {
        await axios.put(`http://localhost:5000/api/suppliers/${editId}`, form);
        alert("Supplier updated successfully.");
      } else {
        await axios.post("http://localhost:5000/api/suppliers", form);
        alert("Supplier added successfully.");
      }
      setForm({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        location: "",
        materials: "",
        leadTimeDays: "",
        notes: "",
        contact: ""
      });
      setEditMode(false);
      setEditId(null);
      fetchSuppliers();
    } catch (err) {
      alert("Error submitting supplier.");
    }
  };

  // Handle edit mode
  const handleEdit = (supplier) => {
    setForm(supplier);
    setEditId(supplier.id);
    setEditMode(true);
  };

  // Handle supplier deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      fetchSuppliers();
      alert("Supplier deleted successfully.");
    } catch (err) {
      alert("Error deleting supplier.");
    }
  };

  // Render component
  return (
    <div style={{ padding: 20 }}>
      <h2>Supplier Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="name"
          placeholder="Supplier Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="contactPerson"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          name="materials"
          placeholder="Materials (comma-separated)"
          value={form.materials}
          onChange={handleChange}
        />
        <input
          name="leadTimeDays"
          type="number"
          placeholder="Lead Time (days)"
          value={form.leadTimeDays}
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contact Email"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <button type="submit">{editMode ? "Update" : "Add"} Supplier</button>
      </form>

      <ul>
        {suppliers.map((s) => (
          <li key={s.id}>
            <strong>{s.name}</strong> — {s.location || "No location"} — {s.contact || "No contact"}
            <div>
              <button onClick={() => handleEdit(s)}>Edit</button>
              <button onClick={() => handleDelete(s.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManager;
