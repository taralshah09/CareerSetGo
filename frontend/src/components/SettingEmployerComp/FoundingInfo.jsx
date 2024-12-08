import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./FoundingInfo.css";

const FoundingInfo = () => {
    const [vision, setVision] = useState('');

    const handleVisionChange = (value) => {
        setVision(value);
    };

    return (
        <form className='profile'>
            <div className="profile-box-1">
                <div className='profile-box-1-left'>
                    <label htmlFor="organizationType">Organization Type</label>
                    <select name="organizationType" id="organizationType">
                        <option value="" disabled selected>Select..</option>
                        <option value="GovernmentOrg">Government Organization</option>
                        <option value="PrivateOrg">Private Organization</option>
                        <option value="PublicOrg">Public Organization</option>
                       
                    </select>
                </div>
                <div className='profile-box-2-left'>
                <label htmlFor="industry">Industry Type</label>
                    <select name="industry" id="industry">
                        <option value="" disabled selected>Select..</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Retail">Retail</option>
                        <option value="Others">Others</option>
                    </select>

                </div>
                <div className='profile-box-2-left'>
                <label htmlFor="team-size">Team Size</label>
                <select name="team-size" id="team-size">
                    <option value="" disabled selected>Select..</option>
                    <option value="1-5">1-5 Members</option>
                    <option value="6-10">6-10 Members</option>
                    <option value="11-20">11-20 Members</option>
                    <option value="21-50">21-50 Members</option>
                    <option value="51+">51+ Members</option>
                </select>

                </div>
            </div>
            <div className="profile-box-2">
                
                
                <div className='profile-box-1-left'>
                    <label htmlFor="title">
                        Year of Establishment
                    </label>
                    <input type="date" id='title' />
                </div>
                <div className="profile-box-1-left">
                        <label htmlFor="company-website">Company Website</label>
                        <input type="text" placeholder='Website Url' />
                </div>
            </div>
            
            <div className="profile-box-4">
                <label htmlFor="companyVision">Company Vision</label>
                <ReactQuill
                    value={vision}
                    onChange={handleVisionChange}
                    placeholder="Tell us What Vision Of Your Company..."
                />
            </div>
            <div className="profile-box-5">
                <button type="submit">Save Changes</button>
            </div>
        </form>
    );
};

export default FoundingInfo;
