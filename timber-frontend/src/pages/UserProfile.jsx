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
      return;
    }
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone || "",
          role: res.data.role || "N/A",
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
      if (!userId) throw new Error("User ID is undefined");
      await axios.put(`/api/users/${userId}`, form);

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
      if (!userId) throw new Error("User ID is undefined");
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
    <div className="p-6 bg-white shadow rounded">
      <h3 className="text-xl font-semibold mb-4">My Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded w-full"
          />
          <div className="flex items-center">
            <strong>Role:</strong>
            <span className="ml-2">{form.role}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="font-medium mb-2">Avatar:</p>
          {preview && (
            <img
              src={preview}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
            />
          )}
          <input type="file" onChange={handleAvatarChange} className="block" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>

        {status === "success" && <p className="text-green-600 mt-2">Profile updated!</p>}
        {status === "error" && <p className="text-red-600 mt-2">Update failed. Try again.</p>}
      </form>

      <div className="mt-6">
        {showPasswordForm ? (
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={handlePasswordChange}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Password
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowPasswordForm(true)}
            className="mt-4 text-blue-600 hover:underline"
          >
            Change Password
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
