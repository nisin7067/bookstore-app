import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import CSS for styling
import AddBookForm from './AddBookForm'; // Import AddBookForm component
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard component

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        // Successful login
        setIsLoggedIn(true); // Set login status to true
        localStorage.setItem('adminToken', data.token); // Store token in localStorage
        navigate('/admin/dashboard');
      } else {
        // Failed login
        setError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove token from localStorage
    setIsLoggedIn(false); // Set login status to false
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {!isLoggedIn ? ( // Show login form if not logged in
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <AdminDashboard /> {/* Show AdminDashboard component if logged in */}
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
