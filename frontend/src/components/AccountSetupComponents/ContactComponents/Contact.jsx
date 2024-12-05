import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {


  return (

      <div className="main-content" style={{textAlign : "left"}}>
      <form className='profile'>
            <div className="profile-box-1">
                <div className='profile-box-1-left'>
                    <label htmlFor="location">Map Location</label>
                    <input type="text" id="location"/>
                </div>
            </div>
            <div className="profile-box-2">
                <div className='profile-box-2-left'>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" placeholder="Phone Number"/>
                </div>
            </div>
            <div className="profile-box-3">
                <div className="profile-box-3-left">
                    <label htmlFor="email">E-MAIL</label>
                    <input type="email" id="email" placeholder="Email Address"/>
                </div>
            </div>
            <div className="btns">
              <div className="profile-box-5">
                  <button type="submit">Previous</button>
              </div>
              <div className="profile-box-6">
                  <button type="submit" className="save-btn">Finish Editing<FaArrowRight className="arrow-icon" /></button>
              </div>
            </div>
        </form>
      </div>
  );
};

export default Contact;
