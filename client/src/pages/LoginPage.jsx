import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token);
      navigate('/search');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-darkBlue">Login</h2>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        <input className="w-full border p-2 rounded" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-primaryBlue text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
