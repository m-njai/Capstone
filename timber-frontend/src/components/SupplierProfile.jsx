import React, { useEffect, useState } from "react";
import axios from "axios";

const SupplierProfile = ({ supplierId }) => {
  const [supplier, setSupplier] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/suppliers").then(res => {
      const match = res.data.suppliers.find(s => s.id === supplierId);
      setSupplier(match);
    });
    axios.get("/api/suppliers/orders").then(res => {
      const filtered = res.data.orders.filter(o => o.supplier_id === supplierId);
      setOrders(filtered);
    });
  }, [supplierId]);

  if (!supplier) return <p>Loading supplier profile...</p>;

  return (
    <div>
      <h3>{supplier.name}</h3>
      <p>Location: {supplier.location}</p>
      <p>Contact: {supplier.contact}</p>
      {supplier.rating && <p>Rating: {[...Array(Number(supplier.rating))].map((_, i) => "⭐")}</p>}

      <h4>Past Orders</h4>
      <ul>
        {orders.map((o) => (
          <li key={o.order_id}>
            {o.timber_type} – {o.quantity} m³ – {new Date(o.timestamp).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierProfile;
