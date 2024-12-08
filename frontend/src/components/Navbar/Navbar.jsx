import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8000/logout/', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refreshtoken');
      setIsLoggedIn(false);
      navigate('/');
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
          <div 
            className="resume-dropdown"
            onMouseEnter={() => setShowResumeDropdown(true)}
            onMouseLeave={() => setShowResumeDropdown(false)}
          >
            <span className="nav-link">Resume</span>
            {showResumeDropdown && (
              <div className="dropdown-content">
                <NavLink to="/resume-builder" className="dropdown-item">Resume Builder</NavLink>
                <NavLink to="/enhance-resume" className="dropdown-item">Enhance Resume</NavLink>
              </div>
            )}
          </div>
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