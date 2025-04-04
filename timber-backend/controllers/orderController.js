const { v4: uuidv4 } = require("uuid");

let orders = []; // In-memory for now

const createOrder = (req, res) => {
  const { supplier_id, timber_type, quantity, expected_delivery } = req.body;
  if (!supplier_id || !timber_type || !quantity || !expected_delivery) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newOrder = {
    order_id: uuidv4(),
    supplier_id,
    timber_type,
    quantity,
    expected_delivery,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

const getAllOrders = (req, res) => {
  res.json({ orders });
};

const getOrderById = (req, res) => {
  const order = orders.find(o => o.order_id === req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.order_id === id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  order.status = status;
  res.json({ message: "Status updated", order });
};

const deleteOrder = (req, res) => {
  orders = orders.filter(o => o.order_id !== req.params.id);
  res.json({ message: "Order deleted" });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};