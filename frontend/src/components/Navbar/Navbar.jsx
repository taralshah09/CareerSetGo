import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='header-div'>
      <nav className='top-div'>
        <ul type="none">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/find-job" className="nav-link">Find Job</NavLink>
          <NavLink to="/employers" className="nav-link">Employers</NavLink>
          <NavLink to="/candidates" className="nav-link">Candidates</NavLink>
          <NavLink to="/customer-support" className="nav-link">Customer Support</NavLink>
        </ul>

      </nav>
      <div className="bottom-div">
        <h2>
          <img src="../images/logo.png"></img>
          CareerSetGo
        </h2>

        <div className="search-box">
          <img src="../images/search.png" alt="" />
          <input type="text" placeholder='Job title, keyword, company' />
        </div>

        <div className="buttons-box">
          <button>Sign In</button>
          <button>Post A Job</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
