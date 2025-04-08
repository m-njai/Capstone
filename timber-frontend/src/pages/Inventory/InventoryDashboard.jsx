import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryDashboard = () => {
  const [inventory, setInventory] = useState({});

  useEffect(() => {
    axios.get("/api/inventory").then(res => {
      setInventory(res.data.inventory);
    });
  }, []);

  return (
    <div>
      <h3>Inventory Levels</h3>
      <ul>
        {Object.entries(inventory).map(([type, qty]) => (
          <li key={type}>
            {type}: {qty} m³
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryDashboard;
