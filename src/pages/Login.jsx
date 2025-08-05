import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
      alert('User not found. Please signup first.');
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
      localStorage.setItem('loggedInUser', email);
      navigate("/")
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className='flex items-center justify-center gap-3 mt-3'>
        <p>Don't have an account?</p>
        <Link to="/signup" className='text-sm font-semibold text-blue-600'>Signup</Link>
      </div>
        </div>
    </div>
  );
};

export default Login;
