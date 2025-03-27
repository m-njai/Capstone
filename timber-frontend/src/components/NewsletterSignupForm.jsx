import React, { useState } from "react";
import axios from "axios";

const NewsletterSignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/newsletter", form);
      setStatus("success");
      setForm({ name: "", email: "" });
    } catch (err) {
      setStatus(err.response?.data?.error || "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Subscribe to Our Newsletter</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <button type="submit">Subscribe</button>
      {status === "success" && <p>You're now subscribed!</p>}
      {status && status !== "success" && <p style={{ color: "red" }}>{status}</p>}
    </form>
  );
};

export default NewsletterSignupForm;
