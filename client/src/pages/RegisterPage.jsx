import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginRegister.css';
import { Link } from 'react-router-dom';
const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://healthtrackerbackend-9yfh.onrender.com/auth/register', formData);
      if (res.status === 201 || res.status === 200) {
        alert('Registration successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
      </form>
      <Link to="/login" className="auth-link">Already have an account? Login</Link>
    </div>
  );
};

export default RegisterPage;
