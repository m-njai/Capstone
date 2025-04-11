import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, MenuItem, Select, Typography, Grid, Divider
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import photoHero1 from '../../photos/photo50.jpg';
import photoHero2 from '../../photos/photo39.jpg';

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ category: '', name: '', quantity: 0, unit: '' });
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [photoHero1, photoHero2];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
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
      await axios.post('/api/inventory', newItem);
      loadInventory();
      setNewItem({ category: '', name: '', quantity: 0, unit: '' });
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  const categorySummary = categories.reduce((acc, category) => {
    acc[category] = inventory
      .filter(item => item.category === category)
      .reduce((sum, item) => sum + item.quantity, 0);
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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Banner */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          backgroundImage: `url(${heroImages[currentHero]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          transition: "background-image 1s ease-in-out",
          position: "relative",
          animation: "fadeIn 1.5s ease-in",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            animation: "slideUp 1s ease-out",
          }}
        >
          <h2 style={{ fontSize: "2.25rem", fontWeight: 600 }}>
            Manage Your Inventory Efficiently
          </h2>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "1rem auto" }}>
            Visualize materials, track availability, and ensure optimal supply for every phase.
          </p>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <div style={{
        backgroundColor: '#f9fafb',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <Typography variant="h4" gutterBottom style={{ color: '#1f2937', fontWeight: 600 }}>
          Inventory Dashboard
        </Typography>

        {/* Charts Overview */}
        <Grid container spacing={4} style={{ marginBottom: '2rem' }}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                Inventory Distribution by Category
              </Typography>
              <Pie data={pieData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '1rem', height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Total Inventory Items: {inventory.length}
              </Typography>
              <ul>
                {Object.entries(categorySummary).map(([cat, qty]) => (
                  <li key={cat}><strong>{cat}</strong>: {qty}</li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Divider style={{ margin: '2rem 0' }} />

        {/* Inventory Table */}
        <Typography variant="h5" gutterBottom>Inventory List</Typography>
        <TableContainer component={Paper} style={{ marginBottom: '2rem' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f3f4f6' }}>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Unit</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider style={{ marginBottom: '2rem' }} />

        {/* Add New Inventory */}
        <Typography variant="h5" gutterBottom>Add New Inventory</Typography>
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
          <Grid item xs={12} md={6}>
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
            <TextField
              label="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
              Add Inventory Item
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default InventoryDashboard;
