import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// This component handles the verification link from the email.
export default function VerifySuccess() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    // In a real app, you would typically send this token to your backend to confirm verification.
    // For this example, we'll assume the backend handles it and redirects with the token
    // that the Login page can use.
    if (token) {
        setMessage('Email verified successfully! Redirecting to login...');
        
        // Redirect to the login page with the token as a query parameter
        setTimeout(() => {
            navigate(`/login?token=${token}`);
        }, 3000); // 3-second delay before redirecting
    } else {
        setMessage('Invalid verification link.');
    }
  }, [token, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}
