import React, { useEffect, useState } from "react";
import axios from "axios";

const MaterialOrderForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [order, setOrder] = useState({ supplier_id: "", timber_type: "", quantity: "" });

  useEffect(() => {
    axios.get("/api/suppliers").then(res => {
      setSuppliers(res.data.suppliers || []);
    });
  }, []);

  const handleChange = (e) => setOrder({ ...order, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/suppliers/order", order);
    alert(res.data.message);
    setOrder({ supplier_id: "", timber_type: "", quantity: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h3>Place a Material Order</h3>
      <select name="supplier_id" value={order.supplier_id} onChange={handleChange} required>
        <option value="">Select Supplier</option>
        {suppliers.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <input name="timber_type" placeholder="Timber Type" value={order.timber_type} onChange={handleChange} required />
      <input name="quantity" type="number" placeholder="Quantity (m³)" value={order.quantity} onChange={handleChange} required />
      <button type="submit">Submit Order</button>
    </form>
  );
};

export default MaterialOrderForm;
