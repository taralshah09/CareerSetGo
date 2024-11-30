import React, { useState, useEffect } from 'react';
import './SocialLinks.css';

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

    // Fetch existing profile data when the component mounts
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
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
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchData();
    }, []);

    // Handle input change for social links
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
            const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
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
    );
};

export default SocialLinks;
