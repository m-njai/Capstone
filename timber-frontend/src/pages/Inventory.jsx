import React, { useEffect, useState } from "react";
import { getInventory, addInventory } from "../api/api";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [newItem, setNewItem] = useState({ timber_type: "", stock: "", reorder_threshold: "" });

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        try {
            const response = await getInventory();
            setInventory(response.data.inventory);
        } catch (error) {
            console.error("Error loading inventory:", error);
        }
    };

    const handleAddInventory = async () => {
        await addInventory(newItem);
        loadInventory();
        setNewItem({ timber_type: "", stock: "", reorder_threshold: "" });
    };

    return (
        <Container>
            <h2>Timber Inventory</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Timber Type</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Reorder Threshold</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.timber_type}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>{item.reorder_threshold}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h3>Add New Inventory</h3>
            <TextField label="Timber Type" value={newItem.timber_type} onChange={(e) => setNewItem({ ...newItem, timber_type: e.target.value })} />
            <TextField label="Stock" type="number" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} />
            <TextField label="Reorder Threshold" type="number" value={newItem.reorder_threshold} onChange={(e) => setNewItem({ ...newItem, reorder_threshold: e.target.value })} />
            <Button variant="contained" color="primary" onClick={handleAddInventory}>Add Inventory</Button>
        </Container>
    );
};
export default Inventory;
