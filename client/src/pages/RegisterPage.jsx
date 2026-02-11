import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-darkBlue">Register</h2>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <input className="w-full border p-2 rounded" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-primaryBlue text-white py-2 rounded">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
