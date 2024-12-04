import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';  // Import useNavigate here
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token); // Set login status based on token presence
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API using the fetchWithAuth function
      const response = await fetchWithAuth('http://localhost:8000/logout/', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      // Clear tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refreshtoken');

      // Update the state to reflect logout
      setIsLoggedIn(false);

      // Redirect the user to the home page or login page after logout
      navigate('/');  // Use navigate() instead of history.push()
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='header-div'>
      <nav className='top-div'>
        <ul type="none">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/find-job" className="nav-link">Find Job</NavLink>
          <NavLink to="/employers" className="nav-link">Employers</NavLink>
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/resume-builder" className="nav-link">Resume builder</NavLink>
          <NavLink to="/customer-support" className="nav-link">Customer Support</NavLink>
          <NavLink to="/choices-game" className="nav-link">Choices game</NavLink>
        </ul>
      </nav>

      <div className="bottom-div">
        <h2>
          <img src="../images/logo.png" alt="logo" />
          CareerSetGo
        </h2>

        <div className="search-box">
          <img src="../images/search.png" alt="search" />
          <input type="text" className='search-bar' placeholder='Job title, keyword, company' />
        </div>

        <div className="buttons-box">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <button>Sign In</button>
              </NavLink>
              <button>Post A Job</button>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
