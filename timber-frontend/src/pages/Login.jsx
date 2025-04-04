import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import background from '../photos/photo12.jpg';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const token = await userCredential.user.getIdToken(); // ✅ Firebase ID token

      const res = await axios.post(
        '/api/auth/login',
        { email: form.email }, // 🔐 We only send email, since password was handled by Firebase
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Auth header with token
          },
        }
      );

      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: 'rgba(31, 41, 55, 0.9)',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
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
            }}
          >
            SG
          </div>
          <h1 style={{ fontSize: '1.3rem', margin: 0 }}>SmartGrain Systems</h1>
        </div>

        <div>
          <button
            onClick={() => navigate('/')}
            style={{
              marginRight: '1rem',
              padding: '0.4rem 1rem',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              border: '1px solid #93c5fd',
              color: '#93c5fd',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '0.4rem 1rem',
              fontSize: '1rem',
              backgroundColor: '#3b82f6',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
        </div>
      </header>

      {/* Login Form */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '2.5rem 2rem',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            Welcome Back
          </h2>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              value={form.email}
              style={{
                width: '100%',
                padding: '0.7rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
              placeholder="e.g. user@example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.3rem' }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              value={form.password}
              style={{
                width: '100%',
                padding: '0.7rem',
                fontSize: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: '1rem 2rem',
          backgroundColor: 'rgba(31, 41, 55, 0.9)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <p>&copy; {new Date().getFullYear()} SmartGrain Systems</p>
        <div style={{ marginTop: '0.5rem' }}>
          <a href="/privacy" style={{ color: '#93c5fd', marginRight: '1rem' }}>Privacy</a>
          <a href="/terms" style={{ color: '#93c5fd' }}>Terms</a>
        </div>
      </footer>
    </div>
  );
}

export default Login;
