import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import "./FoundingInfo.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FoundingInfo = () => {
  const [biography, setBiography] = useState("");

  const handleBiographyChange = (value) => {
    setBiography(value);
  };

  return (

      <div className="main-content" style={{textAlign : "left"}}>
      <form className='profile'>
            <div className="profile-box-1">
                <div className='profile-box-1-left'>
                    <label htmlFor="organization">Organization Type</label>
                    <select name="organization" id="organization">
                        <option value="Government Organizations">Government Organizations</option>
                        <option value="Private Organizations">Private Organizations</option>
                    </select>
                </div>
                <div className='profile-box-1-right'>
                <label htmlFor="industry">Industry Types</label>
                    <select name="industry" id="industry">
                      <option value="manufacturing">Manufacturing</option>
                      <option value="service">Service</option>
                      <option value="retail">Retail</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="automotive">Automotive</option>
                      <option value="construction">Construction</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="transportation">Transportation</option>
                      <option value="energy">Energy</option>
                      <option value="agriculture">Agriculture</option>
                    </select>
                </div>
            </div>
            <div className="profile-box-2">
                <div className='profile-box-2-left'>
                    <label htmlFor="teamsize">Team Size</label>
                    <select name="teamsize" id="teamsize">
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-500">101-500</option>
                    <option value="501+">501+</option>
                    </select>
                </div>
                <div className='profile-box-2-right'>
                    <label htmlFor="title">
                      Year of Establishment
                    </label>
                    <input type="date" id='title' />
                </div>
            </div>
            <div className="profile-box-3">
                <div className="profile-box-3-left">
                    <label htmlFor="companywebsite">Company Website</label>
                    <input type="url" id="companywebsite" placeholder="Website Url..."/>
                </div>
            </div>
            <div className="profile-box-4">
                <label htmlFor="biography">Company Vision</label>
                <ReactQuill
                    value={biography}
                    onChange={handleBiographyChange}
                    placeholder="Tell us about your company vision..."
                />
            </div>
            <div className="btns">
              <div className="profile-box-5">
                  <button type="submit">Previous</button>
              </div>
              <div className="profile-box-6">
                  <button type="submit" className="save-btn">Save &amp; Next<FaArrowRight className="arrow-icon" /></button>
              </div>
            </div>
        </form>
      </div>
  );
};

export default FoundingInfo;
