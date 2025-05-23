// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/auth';

export default function Login() {
  const nav = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
      nav('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{isRegister ? 'Register' : 'Login'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 hover:underline">
          {isRegister ? 'Login here' : 'Register here'}
        </button>
      </p>
    </div>
  );
}