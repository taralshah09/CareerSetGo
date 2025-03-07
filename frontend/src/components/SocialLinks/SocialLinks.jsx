import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SocialLinks.css';
import api from '../../api/axios';

const SocialLinks = () => {
    const [profileData, setProfileData] = useState({
        twitter_link: '',
        linkedin_link: '',
        insta_link: '',
        other_link: ''
    });

    const [formData, setFormData] = useState({
        twitter_link: '',
        linkedin_link: '',
        insta_link: '',
        other_link: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const fetchData = async () => {
            try {
                const response = await api.get('/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData({
                        twitter_link: data.twitter_link,
                        linkedin_link: data.linkedin_link,
                        insta_link: data.insta_link,
                        other_link: data.other_link
                    });
                } else {
                    toast.error('Failed to fetch profile data', {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                toast.error('Error loading profile data', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access_token');

        try {
            const response = await api.get('/api/user/profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Profile updated:', data);

                // Show success toast notification
                toast.success('Social links updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Update profileData with new values
                setProfileData({
                    ...profileData,
                    ...formData
                });

                // Reset formData
                setFormData({
                    twitter_link: '',
                    linkedin_link: '',
                    insta_link: '',
                    other_link: ''
                });
            } else {
                const errorData = await response.json();
                console.error('Error updating profile:', errorData);

                // Show error toast notification
                toast.error('Failed to update social links', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error submitting profile:', error);

            // Show error toast notification for network/server errors
            toast.error('Something went wrong. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <form className='social-links' onSubmit={handleSubmit}>
                <p>Social Links</p>
                <div className="social-link">
                    <label htmlFor="twitter_link">Twitter</label>
                    <input
                        type="url"
                        id="twitter_link"
                        name="twitter_link"
                        placeholder="Twitter Profile URL"
                        value={formData.twitter_link || profileData.twitter_link || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="social-link">
                    <label htmlFor="linkedin_link">LinkedIn</label>
                    <input
                        type="url"
                        id="linkedin_link"
                        name="linkedin_link"
                        placeholder="LinkedIn Profile URL"
                        value={formData.linkedin_link || profileData.linkedin_link || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="social-link">
                    <label htmlFor="insta_link">Instagram</label>
                    <input
                        type="url"
                        id="insta_link"
                        name="insta_link"
                        placeholder="Instagram Profile URL"
                        value={formData.insta_link || profileData.insta_link || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="social-link">
                    <label htmlFor="other_link">Other</label>
                    <input
                        type="url"
                        id="other_link"
                        name="other_link"
                        placeholder="Other Profile URL"
                        value={formData.other_link || profileData.other_link || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
};

export default SocialLinks;