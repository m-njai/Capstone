import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('/api/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      setError('Failed to load suppliers.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setEditForm({ ...supplier });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await axios.delete(`/api/suppliers/${id}`);
      setSuppliers(suppliers.filter(s => s.id !== id));
    } catch (err) {
      alert('Failed to delete supplier.');
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/suppliers/${editingSupplier.id}`, editForm);
      const updated = suppliers.map(s =>
        s.id === editingSupplier.id ? res.data : s
      );
      setSuppliers(updated);
      setEditingSupplier(null);
    } catch (err) {
      alert('Failed to update supplier.');
    }
  };

  const handleCancel = () => {
    setEditingSupplier(null);
    setEditForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className="text-gray-600">Loading suppliers...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Suppliers</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Materials</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={supplier.id || `supplier-row-${index}`}>
                <td className="p-2 border">{supplier.name}</td>
                <td className="p-2 border">{supplier.contactPerson}</td>
                <td className="p-2 border">{supplier.email}</td>
                <td className="p-2 border">{supplier.phone}</td>
                <td className="p-2 border">{supplier.location}</td>
                <td className="p-2 border">{supplier.materials?.join(', ')}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEdit(supplier)} className="text-green-700 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(supplier.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {suppliers.map((supplier, index) => (
          <div key={supplier.id || `supplier-card-${index}`} className="border rounded p-4 shadow">
            <p><strong>Name:</strong> {supplier.name}</p>
            <p><strong>Contact:</strong> {supplier.contactPerson}</p>
            <p><strong>Email:</strong> {supplier.email}</p>
            <p><strong>Phone:</strong> {supplier.phone}</p>
            <p><strong>Location:</strong> {supplier.location}</p>
            <p><strong>Materials:</strong> {supplier.materials?.join(', ')}</p>
            <div className="flex gap-4 mt-2">
              <button onClick={() => handleEdit(supplier)} className="text-green-700 hover:underline">Edit</button>
              <button onClick={() => handleDelete(supplier.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Edit Supplier</h3>
            <div className="space-y-3">
              <input name="name" value={editForm.name} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Name" />
              <input name="contactPerson" value={editForm.contactPerson} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Contact Person" />
              <input name="email" value={editForm.email} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Email" />
              <input name="phone" value={editForm.phone} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Phone" />
              <input name="location" value={editForm.location} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Location" />
              <input
                name="materials"
                value={editForm.materials?.join(', ')}
                onChange={(e) =>
                  setEditForm({ ...editForm, materials: e.target.value.split(',').map(m => m.trim()) })
                }
                className="w-full border p-2 rounded"
                placeholder="Materials (comma-separated)"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button onClick={handleSave} className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900">Save</button>
              <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
