import React, { useState } from "react";
import "./AccSetting.css";
import {  Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const AccSetting = () => {
  const [formData, setFormData] = useState({
    mapLocation: "",
    phone: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      {/* Contact Information */}
      <div className="form-section">
        <h3>Contact Information</h3>
        <label
          className="form-label"
          onClick={() => document.getElementsByName("mapLocation")[0]?.focus()}
        >
          Map Location
        </label>
        <input
          type="text"
          name="mapLocation"
          value={formData.mapLocation}
          onChange={handleInputChange}
          placeholder="Enter map location"
          className="form-input"
        />

        <label
          className="form-label"
          onClick={() => document.getElementsByName("phone")[0]?.focus()}
        >
          Phone
        </label>
        <div className="phone-input-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            className="country-code-dropdown"
            style={{ width: '60px', marginRight: '10px' }}
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
            {/* Add more country codes here */}
          </select>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className="form-input"
          />
        </div>

        <label
              className="form-label"
          onClick={() => document.getElementsByName("email")[0]?.focus()}
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter email address"
          className="form-input"
        />
      </div>
      
      <div className="profile-box-5">
          <button type="submit">Save Changes</button>
      </div>
      <hr />
      <div className="form-section">
        <h3>Change Password</h3>
        <div className="password-row">
          <div className="password-input-wrapper">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Current Password"
              className="form-input"
            />
          </div>
          <div className="password-input-wrapper">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="New Password"
              className="form-input"
            />
          </div>
          <div className="password-input-wrapper">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="form-input"
            />
          </div>
        </div>

        
      <div className="profile-box-5">
          <button type="submit">Change Password</button>
      </div>
      <hr />
      </div>

      {/* Delete Account */}
      <div className="form-section">
        <h3>Delete Your Company</h3>
        <p className="form-info">
          If you delete your Jobpilot, account, you will no longer be able to get information about the matched jobs,
           following employers, and job alert, shortisted jobs and more. 
           You will be abandoned from all the services of Jobpilot.com.
        </p>
        
          <div className="icon-container">
          <CloseIcon style={{ color: 'red', border: '2px solid red', borderRadius: '50%',fontSize: '18px' }} />
            <p className="form-info-badge">
            &nbsp;Close Account</p>
          </div>
          
      </div>

    </form>
  );
};

export default AccSetting;
