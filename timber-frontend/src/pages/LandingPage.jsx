import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Select,
  Typography,
  Grid,
  Divider,
  IconButton,
  Box
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { LayoutDashboard, Trash2, Pencil } from 'lucide-react';

const InventoryDashboard = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ category: '', name: '', quantity: 0, unit: '' });
  const [editingItem, setEditingItem] = useState(null);

  const categories = [
    'Foundation and Groundwork',
    'Timber Framing and Structural Components',
    'Roofing',
    'Exterior Cladding',
    'Windows and Doors',
    'Interior Finishes',
    'Utilities and Fixtures',
    'Landscaping and Outdoor Features'
  ];

  const units = ['cubic meters', 'kg', 'pieces', 'liters'];

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setInventory(response.data.inventory);
    } catch (error) {
      console.error('Error loading inventory:', error);
    }
  };

  const handleAddInventory = async () => {
    try {
      if (editingItem) {
        await axios.put(`/api/inventory/${editingItem._id}`, newItem);
      } else {
        await axios.post('/api/inventory', newItem);
      }
      loadInventory();
      setNewItem({ category: '', name: '', quantity: 0, unit: '' });
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving inventory:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ category: item.category, name: item.name, quantity: item.quantity, unit: item.unit });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      loadInventory();
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const categorySummary = categories.reduce((acc, category) => {
    acc[category] = inventory.filter(item => item.category === category).reduce((sum, item) => sum + item.quantity, 0);
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categorySummary),
    datasets: [
      {
        data: Object.values(categorySummary),
        backgroundColor: [
          '#4caf50', '#2196f3', '#ff9800', '#9c27b0',
          '#00bcd4', '#e91e63', '#ffc107', '#8bc34a'
        ]
      }
    ]
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', backgroundColor: '#1f2937', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#93c5fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#1f2937' }}>SG</div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>SmartGrain Inventory</h1>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LayoutDashboard /> Home
        </button>
      </header>

      <main style={{ backgroundColor: '#f9fafb', padding: '2rem' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#1f2937', fontWeight: 600 }}>Inventory Dashboard</Typography>

        <Grid container spacing={4} style={{ marginBottom: '2rem' }}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '1rem' }}>
              <Typography variant="h6" gutterBottom>Inventory Distribution by Category</Typography>
              <Pie data={pieData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '1rem', height: '100%' }}>
              <Typography variant="h6" gutterBottom>Total Inventory Items: {inventory.length}</Typography>
              <ul>
                {Object.entries(categorySummary).map(([cat, qty]) => (
                  <li key={cat}><strong>{cat}</strong>: {qty}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Divider style={{ margin: '2rem 0' }} />

        <Typography variant="h5" gutterBottom>Inventory List</Typography>
        <TableContainer component={Paper} style={{ marginBottom: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f3f4f6' }}>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Unit</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(item)}><Pencil size={16} /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item._id)}><Trash2 size={16} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider style={{ marginBottom: '2rem' }} />

        <Typography variant="h5" gutterBottom>{editingItem ? 'Edit Inventory Item' : 'Add New Inventory'}</Typography>
        <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>Category</Typography>
              <Select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>Item Name</Typography>
              <TextField
                placeholder="e.g. Treated Pine Plank"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>Quantity</Typography>
              <TextField
                type="number"
                placeholder="Enter quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>Unit</Typography>
              <Select
                value={newItem.unit}
                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>Select Unit</MenuItem>
                {units.map((unit) => (
                  <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleAddInventory}>
                {editingItem ? 'Update Item' : 'Add Inventory Item'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </main>

      <footer style={{ padding: '1.5rem 2rem', backgroundColor: '#1f2937', color: '#fff', textAlign: 'center', marginTop: '3rem' }}>
        <p>&copy; {new Date().getFullYear()} SmartGrain Systems</p>
        <div style={{ marginTop: '0.5rem' }}>
          <a href="/privacy" style={{ color: '#93c5fd', marginRight: '1rem' }}>Privacy</a>
          <a href="/terms" style={{ color: '#93c5fd' }}>Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default InventoryDashboard;
