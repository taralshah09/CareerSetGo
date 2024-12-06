import React, { useState } from 'react';
import './SocialLinks.css';

const SocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState([
        { id: 1, platform: 'Facebook', url: '' },
        { id: 2, platform: 'Twitter', url: '' },
        { id: 3, platform: 'Instagram', url: '' },
        { id: 4, platform: 'Youtube', url: '' }
    ]);

    const handlePlatformChange = (id, platform) => {
        setSocialLinks(socialLinks.map(link =>
            link.id === id ? { ...link, platform } : link
        ));
    };

    const handleUrlChange = (id, url) => {
        setSocialLinks(socialLinks.map(link =>
            link.id === id ? { ...link, url } : link
        ));
    };

    const addSocialLink = () => {
        setSocialLinks([
            ...socialLinks,
            { id: socialLinks.length + 1, platform: 'Facebook', url: '' }
        ]);
    };

    const removeSocialLink = (id) => {
        setSocialLinks(socialLinks.filter(link => link.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submit logic here
        console.log(socialLinks);
    };

    return (
        <form className='social-links' onSubmit={handleSubmit}>
            <p>Social Links</p>
            {socialLinks.map(link => (
                <div className="social-link" key={link.id}>
                    <select
                        value={link.platform}
                        onChange={(e) => handlePlatformChange(link.id, e.target.value)}
                    >
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Youtube">Youtube</option>
                    </select>
                    <input
                        type="url"
                        placeholder="Profile link/url..."
                        value={link.url}
                        onChange={(e) => handleUrlChange(link.id, e.target.value)}
                    />
                    <button type="button" onClick={() => removeSocialLink(link.id)}>✕</button>
                </div>
            ))}
            <button type="button" onClick={addSocialLink}>+ Add New Social Link</button>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default SocialLinks;
