import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderManager = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders and identify delayed ones
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/suppliers/orders");
      const data = res.data.orders || [];
      setOrders(data);

      // Filter for delayed orders
      const delayed = data.filter((o) => {
        if (o.status === "Delivered" || !o.expected_delivery) return false;
        return new Date(o.expected_delivery) < new Date();
      });

      // Show warning for delayed orders
      if (delayed.length > 0) {
        toast.warning(`${delayed.length} order(s) are delayed!`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      alert("Error fetching orders.");
    }
  };

  // Update order status
  const updateStatus = async (order_id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/suppliers/orders/${order_id}/status`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      alert("Error updating status.");
    }
  };

  // Check if an order is delayed
  const isDelayed = (order) => {
    if (order.status === "Delivered" || !order.expected_delivery) return false;
    const today = new Date();
    const expected = new Date(order.expected_delivery);
    return today > expected;
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3>Material Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Timber</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Expected Delivery</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.supplier_name}</td>
              <td>{order.timber_type}</td>
              <td>{order.quantity}</td>
              <td>
                {order.status}
                {isDelayed(order) && (
                  <span style={{ color: "red", fontWeight: "bold", marginLeft: 10 }}>
                    (Delayed)
                  </span>
                )}
              </td>
              <td>{new Date(order.expected_delivery).toLocaleDateString()}</td>
              <td>
                {order.status !== "Delivered" && (
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.order_id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default OrderManager;
