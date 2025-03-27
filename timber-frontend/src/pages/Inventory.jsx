import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select } from "@mui/material";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [newItem, setNewItem] = useState({ category: "", name: "", quantity: 0, unit: "" });

    const categories = [
        "Foundation and Groundwork",
        "Timber Framing and Structural Components",
        "Roofing",
        "Exterior Cladding",
        "Windows and Doors",
        "Interior Finishes",
        "Utilities and Fixtures",
        "Landscaping and Outdoor Features"
    ];

    const units = ["cubic meters", "kg", "pieces", "liters"];

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/inventory");
            setInventory(response.data.inventory);
        } catch (error) {
            console.error("Error loading inventory:", error);
        }
    };

    const handleAddInventory = async () => {
        try {
            await axios.post("http://localhost:8000/api/inventory", newItem);
            loadInventory();
            setNewItem({ category: "", name: "", quantity: 0, unit: "" });
        } catch (error) {
            console.error("Error adding inventory:", error);
        }
    };

    return (
        <Container>
            <h2>Inventory</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
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

            <h3>Add New Inventory</h3>
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
            <TextField
                label="Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                fullWidth
            />
            <TextField
                label="Quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: +e.target.value })}
                fullWidth
            />
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
            <Button variant="contained" color="primary" onClick={handleAddInventory}>
                Add Item
            </Button>
        </Container>
    );
};

export default Inventory;
