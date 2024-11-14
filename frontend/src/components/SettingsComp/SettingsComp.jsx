import React, { useState } from 'react';
import './SettingsComp.css';
import { FaUser, FaUserCircle, FaLink, FaCogs } from 'react-icons/fa';
import Personal from '../Personal/Personal';
import Profile from '../Profile/Profile';
import SocialLinks from '../SocialLinks/SocialLinks';
import OtherFields from '../OtherFields/OtherFields';

const SettingsComp = () => {
  const [selectedOption, setSelectedOption] = useState('Personal');

  const options = [
    { id: 'Personal', label: 'Personal', icon: <FaUser /> },
    { id: 'Profile', label: 'Profile', icon: <FaUserCircle /> },
    { id: 'Social Links', label: 'Social Links', icon: <FaLink /> },
    { id: 'Other', label: 'Other', icon: <FaCogs /> },
  ];
  const renderContent = () => {
    switch (selectedOption) {
      case 'Personal':
        return <Personal />;
      case 'Profile':
        return <Profile />;
      case 'Social Links':
        return <SocialLinks/>
      case 'Other':
        return <OtherFields/>;
      default:
        return <div>Select an option from the navigation</div>;
    }
  };

  return (
    <div className="settings-component">
      <h2>Settings</h2>
      <div className="header">
        <nav className="nav-options">
          {options.map((option) => (
            <div
              key={option.id}
              className={`nav-option ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.icon}
              <span>{option.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="content-body">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsComp;
