import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Profile.css";

const Profile = () => {
    const [biography, setBiography] = useState('');

    const handleBiographyChange = (value) => {
        setBiography(value);
    };

    return (
        <form className='profile'>
            <div className="profile-box-1"> 
                <div className='profile-box-1-left'>
                    <label htmlFor="nationality">Nationality</label>
                    <select name="nationality" id="nationality">
                        <option value="India">India</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Sri-Lanka">Sri-Lanka</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Bangladesh">Bangladesh</option>
                    </select>
                </div>
                <div className='profile-box-1-right'>
                    <label htmlFor="title">
                        Date of Birth
                    </label>
                    <input type="date" id='title' />
                </div>
            </div>
            <div className="profile-box-2">
                <div className='profile-box-2-left'>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <div className='profile-box-2-right'>
                    <label htmlFor="maritial-status">Marital Status</label>
                    <select name="maritial-status" id="maritial-status">
                        <option value="Married">Married</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widow">Widow</option>
                    </select>
                </div>
            </div>
            <div className="profile-box-3">
                <div className="profile-box-3-left">
                    <label htmlFor="experience">Experience</label>
                    <select name="experience" id="experience">
                        <option value="10">10+ years</option>
                        <option value="5">5+ years</option>
                        <option value="3">3+ years</option>
                        <option value="1">1+ years</option>
                        <option value="0">No Experience</option>
                    </select>
                </div>
                <div className="profile-box-3-right">
                    <label htmlFor="education">Education</label>
                    <select name="education" id="education">
                        <option value="Masters">Masters</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Diploma">Diploma</option>
                        <option value="HSC">H.S.C.</option>
                        <option value="SSC">S.S.C</option>
                        <option value="School Dropout">School Dropout</option>
                    </select>
                </div>
            </div>
            <div className="profile-box-4">
                <label htmlFor="biography">Biography</label>
                <ReactQuill
                    value={biography}
                    onChange={handleBiographyChange}
                    placeholder="Write your biography here..."
                />
            </div>
            <div className="profile-box-5">
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default Profile;
