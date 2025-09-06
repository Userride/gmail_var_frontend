import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Sending request...');
    try {
        const res = await fetch('https://gmail-backend-la2t.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        
        // The "dev" link should not be shown in production.
        // A clear message to the user is better.
        if (res.ok) {
            setMsg('Registration successful! Please check your email to verify your account.');
        } else {
            setMsg(data.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        setMsg('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Signup</h2>
      {msg && <p style={{ color: msg.includes('failed') ? 'red' : 'green' }}>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
        <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input style={{ width: '100%', padding: '8px', marginBottom: '10px' }} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
