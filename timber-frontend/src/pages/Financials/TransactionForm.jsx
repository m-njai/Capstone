import React, { useState } from "react";
import axios from "axios";

const TransactionForm = ({ onNewTransaction }) => {
  const [form, setForm] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    note: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/finance", form);
    setForm({ ...form, category: "", amount: "", note: "" });
    onNewTransaction?.();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="note" placeholder="Note" value={form.note} onChange={handleChange} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;

