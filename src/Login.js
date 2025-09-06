import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const location = useLocation();

  // Check for token in URL after verification
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setMsg('Email verified successfully! You are now logged in.');
      // Optionally, you can redirect the user after a few seconds
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://gmail-backend-la2t.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setMsg('Logged in successfully!');
      } else {
        setMsg(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
        setMsg('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      {msg && <p style={{ color: msg.includes('failed') ? 'red' : 'green' }}>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/">Signup</Link></p>
    </div>
  );
}
