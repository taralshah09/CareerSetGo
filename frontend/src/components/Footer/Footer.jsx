import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (

    <div className='footer-div'>

      <div className="footer-header">

        <div className="company-details">
          <h2>
            <img src="../images/logo.png" alt="" />
            CareerSetGo
          </h2>
        </div>
        <div className="links-box">
          <div className="link-box">
            <h3>Quick Link</h3>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="link-box">
            <h3>Candidate</h3>
            <ul>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Browse Employers</a></li>
              <li><a href="#">Candidate Dashboard</a></li>
              <li><a href="#">Saved Jobs</a></li>
            </ul>
          </div>
          <div className="link-box">
            <h3>Employers</h3>
            <ul>
              <li><a href="#">Post a Job</a></li>
              <li><a href="#">Browse Candidates</a></li>
              <li><a href="#">Employers Dashboard</a></li>
              <li><a href="#">Applications</a></li>
            </ul>
          </div>
          <div className="link-box">
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>


      <footer>All rights are reserved &copy;CareerSetGo</footer>
    </div>
  )
}

export default Footer
