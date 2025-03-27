import React, { useState } from "react";
import axios from "axios";

const LeadCaptureForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/leads", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Get in Touch</h3>
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
      <button type="submit">Send</button>
      {status === "success" && <p>Thank you! We’ll be in touch.</p>}
      {status === "error" && <p>Something went wrong. Please try again.</p>}
    </form>
  );
};

export default LeadCaptureForm;
