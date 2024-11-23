import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Personal.css';

const Personal = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        fullname: '',
        title: '',
        experience: '',
        education: '',
        personal_website: '',
    });
    const [profilePicture, setProfilePicture] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

    // Fetch existing profile data
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        fullname: data.fullname || '',
                        title: data.title || '',
                        experience: data.experience || '',
                        education: data.education || '',
                        personal_website: data.personal_website || '',
                    });
                    if (data.profile_picture) {
                        setProfilePicture(data.profile_picture);
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'profile_picture') {
            const file = files[0];
            setProfilePicture(URL.createObjectURL(file));
            setProfileData((prev) => ({ ...prev, profile_picture: file }));
        } else if (name === 'resume') {
            const file = files[0];
            setResumeFile(file);
        } else {
            setProfileData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        const formData = new FormData();

        // Only append non-empty fields to FormData
        Object.keys(profileData).forEach((key) => {
            if (profileData[key] && profileData[key].trim && profileData[key].trim() !== '') {
                formData.append(key, profileData[key]);
            }
        });

        // Append profile picture if exists
        if (profileData.profile_picture) {
            formData.append('profile_picture', profileData.profile_picture);
        }

        // Append resume if exists
        if (resumeFile) {
            formData.append('resume', resumeFile);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const updatedProfile = await response.json();
                console.log('Profile updated successfully:', updatedProfile);

                // Update state with the newly submitted data
                setProfileData({
                    fullname: updatedProfile.fullname || '',
                    title: updatedProfile.title || '',
                    experience: updatedProfile.experience || '',
                    education: updatedProfile.education || '',
                    website: updatedProfile.personal_website || '',
                });
                if (updatedProfile.profile_picture) {
                    setProfilePicture(updatedProfile.profile_picture);
                }

                navigate('/dashboard');
            } else {
                const errorData = await response.json();
                console.error('Error updating profile:', errorData);
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
    };

    return (
        <div className="personal">
            <div className="basic-info">
                <div className="basic-info-header">
                    <p>Basic Info</p>
                </div>
                <form className="basic-info-content" onSubmit={handleSubmit}>
                    <div className="basic-info-content-left">
                        <p>Profile Picture</p>
                        <div className="file-box">
                            <label htmlFor="profile_picture">
                                <img src="../images/upload.png" alt="Upload Icon" />
                                <p>Browse Photo or drop here</p>
                                <span>A photo larger than 400 pixels works best. Max photo size 5MB.</span>
                            </label>
                            <input
                                type="file"
                                id="profile_picture"
                                name="profile_picture"
                                onChange={handleChange}
                                accept=".png, .jpg, .jpeg"
                            />
                        </div>
                        {profilePicture && (
                            <div className="profile-picture-preview">
                                <p>Profile Preview:</p>
                                <img
                                    src={profilePicture}
                                    alt="Profile Preview"
                                    className="preview-image"
                                />
                            </div>
                        )}
                    </div>
                    <div className="basic-info-content-right">
                        <div className="top">
                            <div className="top-left">
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    value={profileData.fullname || ''}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="top-right">
                                <label htmlFor="title">Title/Headline</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={profileData.title || ''}
                                    onChange={handleChange}
                                    placeholder="Title/Headline"
                                />
                            </div>
                        </div>
                        <div className="mid-1">
                            <div className="mid-1-left">
                                <label htmlFor="experience">Experience</label>
                                <select
                                    id="experience"
                                    name="experience"
                                    value={profileData.experience || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Experience</option>
                                    <option value="10">10+ years</option>
                                    <option value="5">5+ years</option>
                                    <option value="3">3+ years</option>
                                    <option value="1">1+ years</option>
                                    <option value="0">No Experience</option>
                                </select>
                            </div>
                            <div className="mid-1-right">
                                <label htmlFor="education">Education</label>
                                <select
                                    id="education"
                                    name="education"
                                    value={profileData.education || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Education</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="HSC">H.S.C.</option>
                                    <option value="SSC">S.S.C</option>
                                    <option value="School Dropout">School Dropout</option>
                                </select>
                            </div>
                        </div>
                        <div className="mid-2">
                            <label htmlFor="personal_website">Personal Website</label>
                            <input
                                type="text"
                                id="personal_website"
                                name="personal_website"
                                placeholder="Personal Website URL"
                                value={profileData.personal_website || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="bottom">
                            <div>
                                <label htmlFor="resume">Resume</label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleChange}
                                    accept=".pdf"
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Personal;
