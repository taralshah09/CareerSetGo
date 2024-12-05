import React, { useState } from 'react';
import './SettingEmployer.css';
import { FaUser, FaUserCircle, FaLink, FaCogs } from 'react-icons/fa';
import CompanyInfo from '../../components/SettingEmployerComp/CompanyInfo';
import FoundingInfo from '../../components/SettingEmployerComp/FoundingInfo';
import SocialLinks from '../../components/SettingEmployerComp/SocialLinks';
import AccSetting from '../../components/SettingEmployerComp/AccSetting';

const SettingEmployer = () => {
  const [selectedOption, setSelectedOption] = useState('CompanyInfo');

  const options = [
    { id: 'CompanyInfo', label: 'CompanyInfo', icon: <FaUser /> },
    { id: 'FoundingInfo', label: 'FoundingInfo', icon: <FaUserCircle /> },
    { id: 'Social Links', label: 'Social Links', icon: <FaLink /> },
    { id: 'Acc Setting', label: 'AccSetting', icon: <FaCogs /> },
  ];
  const renderContent = () => {
    switch (selectedOption) {
      case 'FoundingInfo':
        return <FoundingInfo />;
      case 'CompanyInfo':
        return <CompanyInfo />;
      case 'Social Links':
        return <SocialLinks/>
      case 'Acc Setting':
        return <AccSetting/>;
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

export default SettingEmployer;
