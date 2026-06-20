import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/authContext';

export const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await API.post('/auth/register', { email, password, is_admin: email.includes('admin') });
        setIsRegister(false);
        alert('Registration complete! Please login.');
      } else {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const response = await API.post('/auth/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        const token = response.data.access_token;
        const isAdminUser = email.includes('admin');
        login(token, isAdminUser);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication execution failure.');
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        {error && <div className="bg-red-500/10 text-red-500 border border-red-500/20 rounded p-3 mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-red-500" />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors mt-2">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
          {isRegister ? 'Already registered?' : 'New to BookMyShow?'} {' '}
          <button onClick={() => setIsRegister(!isRegister)} className="text-red-500 font-bold hover:underline">
            {isRegister ? 'Sign In Here' : 'Create an Account'}
          </button>
        </p>
      </div>
    </div>
  );
};