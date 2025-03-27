import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountInfo = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then(res => setUser(res.data));
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h4>Account Info</h4>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default AccountInfo;
