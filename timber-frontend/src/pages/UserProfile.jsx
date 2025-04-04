import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ userId }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    if (!userId) {
      console.error("User ID is undefined");
      return; // Exit if userId is not provided
    }
    // Fetch user data safely
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
          role: res.data.role || "N/A"
        });
        setPreview(res.data.avatar);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setStatus("error");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        throw new Error("User ID is undefined");
      }
      // Update user profile details
      await axios.put(`/api/users/${userId}`, form);

      // Upload avatar if present
      if (avatar) {
        const data = new FormData();
        data.append("avatar", avatar);
        await axios.post(`/api/users/${userId}/avatar`, data);
      }

      setStatus("success");
    } catch (err) {
      console.error("Error updating profile:", err);
      setStatus("error");
    }
  };

  const handlePasswordChange = async () => {
    try {
      if (!userId) {
        throw new Error("User ID is undefined");
      }
      // Update the password
      await axios.put(`/api/users/${userId}/change-password`, passwords);
      alert("Password changed successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      console.error("Error updating password:", err);
      alert(err.response?.data?.error || "Error updating password");
    }
  };

  return (
    <div>
      <h3>My Profile</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <p><strong>Role:</strong> {form.role}</p>

        <div>
          <p>Avatar:</p>
          {preview && (
            <img
              src={preview}
              alt="Avatar"
              width={100}
              style={{ borderRadius: "50%" }}
            />
          )}
          <input type="file" onChange={handleAvatarChange} />
        </div>

        <button type="submit">Save Profile</button>
        {status === "success" && <p>Profile updated!</p>}
        {status === "error" && <p>Update failed. Try again.</p>}
      </form>

      {/* Password Change Section */}
      {showPasswordForm ? (
        <div>
          <input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
          <button type="button" onClick={handlePasswordChange}>
            Save Password
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setShowPasswordForm(true)}>
          Change Password
        </button>
      )}
    </div>
  );
};

export default UserProfile;
