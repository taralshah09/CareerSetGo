import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Profile.css";

const Profile = () => {
    const [formData, setFormData] = useState({
        nationality: '',
        date_of_birth: '',
        gender: '',
        marital_status: '',
        biography: '',
        experience: '',
        education: '',
        title: '',
        personal_website: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBiographyChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            biography: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const form = new FormData();
        
        // Add all fields to FormData
        Object.keys(formData).forEach((key) => {
            if (formData[key]) form.append(key, formData[key]);
        });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: form,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Profile updated:', data);
                // Handle profile update (e.g., show success message)
            } else {
                const errorData = await response.json();
                console.error('Error updating profile:', errorData);
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='profile'>
            <div className="profile-box-1">
                <div className='profile-box-1-left'>
                    <label htmlFor="nationality">Nationality</label>
                    <select name="nationality" id="nationality" value={formData.nationality} onChange={handleInputChange}>
                        <option value="India">India</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Sri-Lanka">Sri-Lanka</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Bangladesh">Bangladesh</option>
                    </select>
                </div>
                <div className='profile-box-1-right'>
                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <input type="date" name="date_of_birth" id="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} />
                </div>
            </div>
            <div className="profile-box-2">
                <div className='profile-box-2-left'>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <div className='profile-box-2-right'>
                    <label htmlFor="marital_status">Marital Status</label>
                    <select name="marital_status" id="marital_status" value={formData.marital_status} onChange={handleInputChange}>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widow">Widow</option>
                    </select>
                </div>
            </div>
            <div className="profile-box-3">
                <div className="profile-box-3-left">
                    <label htmlFor="experience">Experience</label>
                    <select name="experience" id="experience" value={formData.experience} onChange={handleInputChange}>
                        <option value="10">10+ years</option>
                        <option value="5">5+ years</option>
                        <option value="3">3+ years</option>
                        <option value="1">1+ years</option>
                        <option value="0">No Experience</option>
                    </select>
                </div>
                <div className="profile-box-3-right">
                    <label htmlFor="education">Education</label>
                    <select name="education" id="education" value={formData.education} onChange={handleInputChange}>
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
                    value={formData.biography}
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
