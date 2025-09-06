import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import VerifySuccess from './VerifySuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<VerifySuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
