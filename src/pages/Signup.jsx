import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if already registered
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("User already exists!");
      return;
    }

    // Save to localStorage
    localStorage.setItem(email, JSON.stringify({ email, password }));
    console.log(localStorage);
    alert("Signup successful! You can now login.");
    setEmail("");
    setPassword("");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Signup
          </button>
        </form>
        <div className="flex items-center justify-center gap-3 mt-3">
          <p>Already have an account?</p>
          <Link to="/login" className="text-sm font-semibold text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
