import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import "./SocialMediaInfo.css";
import "react-quill/dist/quill.snow.css";

const SocialMediaInfo = () => {
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
      <div className="main-content" style={{textAlign : "left"}}>
        <form className='social-links' onSubmit={handleSubmit}>
          {socialLinks.map(link => (
            <div className="social-link" key={link.id}>
              {/* Label for the platform dropdown */}
              <select
                id={`platform-${link.id}`}
                value={link.platform}
                onChange={(e) => handlePlatformChange(link.id, e.target.value)}
              >
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="Youtube">Youtube</option>
              </select>

              {/* Label for the URL input */}
              <input
                id={`url-${link.id}`}
                type="url"
                placeholder="Profile link/url..."
                value={link.url}
                onChange={(e) => handleUrlChange(link.id, e.target.value)}
              />
              
              {/* Remove button */}
              <button type="button" onClick={() => removeSocialLink(link.id)}>✕</button>
            </div>
          ))}

          {/* Button to add new social link */}
          <button type="button" onClick={addSocialLink} className="addlink-btn">+ Add New Social Link</button>
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

export default SocialMediaInfo;
