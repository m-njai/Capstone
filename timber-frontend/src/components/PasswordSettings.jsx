import React, { useState } from "react";
import axios from "axios";

const PasswordSettings = ({ userId }) => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/users/${userId}/change-password`, form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div>
      <h4>Change Password</h4>
      <input name="currentPassword" placeholder="Current" type="password" onChange={handleChange} />
      <input name="newPassword" placeholder="New" type="password" onChange={handleChange} />
      <button onClick={handleSubmit}>Update Password</button>
      {status === "success" && <p>Password updated!</p>}
      {status === "error" && <p style={{ color: "red" }}>Update failed.</p>}
    </div>
  );
};

export default PasswordSettings;
