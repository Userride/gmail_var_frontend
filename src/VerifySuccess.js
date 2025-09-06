import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VerifySuccess() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Hit backend verify endpoint
    fetch('https://gmail-backend-la2t.onrender.com/api/auth/verify/' + token)
      .then(() => {
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch(() => setTimeout(() => navigate('/login'), 2000));
  }, [token, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Email verified!</h2>
      <p>Redirecting to login...</p>
    </div>
  );
}
