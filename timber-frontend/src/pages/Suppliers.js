import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('/api/suppliers');
                setSuppliers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Suppliers</h1>
            <ul>
                {suppliers.map(supplier => (
                    <li key={supplier.id}>{supplier.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Suppliers;