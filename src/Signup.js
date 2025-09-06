import React, { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://gmail-backend-la2t.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (data.verifyLink) {
      setMsg(`Registered. (dev) Verify here: ${data.verifyLink}`);
    } else {
      setMsg(data.message || 'Check your email for verification link');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Signup</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button type="submit">Signup</button>
      </form>
      <p>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}
