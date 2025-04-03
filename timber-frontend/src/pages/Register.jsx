import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import background from '../photos/photo12.jpg';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '',
  });
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  // 🔁 Fetch roles from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/roles')
      .then(res => {
        const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setRoles(sorted);
        setRolesLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to load roles:', err);
        setRolesError(true);
        setRolesLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) return alert('Please accept the terms and conditions.');
    if (form.password !== form.confirmPassword) return alert('Passwords do not match.');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const token = await userCredential.user.getIdToken();

      await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        roleId: form.roleId,
        password: form.password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("🎉 Registration successful!");
      navigate('/login');
    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={logoCircle}>SG</div>
          <h1 style={{ fontSize: '1.3rem', margin: 0 }}>SmartGrain Systems</h1>
        </div>
        <div>
          <button onClick={() => navigate('/')} style={navBtn}>Home</button>
          <button onClick={() => navigate('/login')} style={navPrimaryBtn}>Login</button>
        </div>
      </header>

      {/* Form */}
      <main style={mainStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Create an Account</h2>

          <div style={fieldBlock}>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} placeholder="Your full name" />
          </div>

          <div style={fieldBlock}>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="you@example.com" />
          </div>

          <div style={fieldBlock}>
            <label>Role</label>
            {rolesLoading ? (
              <div style={{ fontSize: '0.9rem', color: '#999' }}>Loading roles...</div>
            ) : rolesError ? (
              <div style={{ fontSize: '0.9rem', color: 'red' }}>Failed to load roles</div>
            ) : (
              <select name="roleId" value={form.roleId} onChange={handleChange} required style={{ ...inputStyle, padding: '0.6rem' }}>
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role._id} value={role._id}>{role.name}</option>
                ))}
              </select>
            )}
          </div>

          <div style={fieldBlock}>
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required style={inputStyle} placeholder="Create a strong password" />
          </div>

          <div style={fieldBlock}>
            <label>Confirm Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required style={inputStyle} placeholder="Re-enter password" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.95rem' }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginRight: '0.5rem' }} />
              I agree to the <a href="/terms" target="_blank" style={{ color: '#2563eb' }}>Terms</a> and <a href="/privacy" target="_blank" style={{ color: '#2563eb' }}>Privacy Policy</a>
            </label>
          </div>

          <button type="submit" disabled={!agreed} style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: agreed ? '#2563eb' : '#93c5fd',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: agreed ? 'pointer' : 'not-allowed'
          }}>
            Register
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} SmartGrain Systems</p>
        <div style={{ marginTop: '0.5rem' }}>
          <a href="/privacy" style={footerLink}>Privacy</a>
          <a href="/terms" style={footerLink}>Terms</a>
        </div>
      </footer>
    </div>
  );
}

// 🎨 Styles
const pageStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  fontFamily: 'Arial, sans-serif',
};

const mainStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.7rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const fieldBlock = {
  marginBottom: '1rem',
};

const navBtn = {
  marginRight: '1rem',
  padding: '0.4rem 1rem',
  fontSize: '1rem',
  backgroundColor: 'transparent',
  border: '1px solid #93c5fd',
  color: '#93c5fd',
  borderRadius: '6px',
  cursor: 'pointer',
};

const navPrimaryBtn = {
  padding: '0.4rem 1rem',
  fontSize: '1rem',
  backgroundColor: '#3b82f6',
  border: 'none',
  color: '#fff',
  borderRadius: '6px',
  cursor: 'pointer',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: 'rgba(31, 41, 55, 0.9)',
  color: '#fff',
};

const footerStyle = {
  padding: '1rem 2rem',
  backgroundColor: 'rgba(31, 41, 55, 0.9)',
  color: '#fff',
  textAlign: 'center',
};

const footerLink = {
  color: '#93c5fd',
  marginRight: '1rem',
};

const logoCircle = {
  width: '40px',
  height: '40px',
  backgroundColor: '#93c5fd',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: '#1f2937',
};

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '2.5rem 2rem',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
};

export default Register;
