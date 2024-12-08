import React, { useState } from 'react';
import './DashboardEmployer.css';
import { FaLayerGroup, FaBriefcase, FaCircle, FaCog, FaBookmark, FaSignOutAlt, FaUserCircle, FaListUl, FaRegIdCard, FaMoneyBillAlt } from 'react-icons/fa';
import OverviewEmployer from '../../components/OverviewEmployer/OverviewEmployer';
import PostJobForm from '../PostJobForm/PostJobForm';
import SavedCandidate from '../SavedCandidateEmployer/SavedCandidate';
import SettingEmployer from '../SettingEmployer/SettingEmployer';
import MyJobCard from '../../MyJobCard';
import PricesAndBilling from '../../components/PricesAndBilling/PricesAndBilling';

const DashboardEmployer = () => {
    const [selectedOption, setSelectedOption] = useState('pricing and billing');

    const options = [

        { id: 'overview', label: 'Overview', icon: <FaLayerGroup /> },
        // { id: 'employers Profile', label: 'Employers Profile', icon: <FaUserCircle /> },
        { id: 'post a Job', label: 'Post a Job', icon: <FaCircle /> },
        { id: 'my Jobs', label: 'My Jobs', icon: <FaBriefcase /> },
        { id: 'pricing and billing', label: 'Pricing and Billing', icon: <FaMoneyBillAlt /> },
        { id: 'saved Candidates', label: 'Saved Candidates', icon: <FaBookmark /> },
        // { id: 'all Companies', label: 'All Companies', icon: <FaRegIdCard /> },
        { id: 'settings', label: 'Settings', icon: <FaCog /> },
    ];

    const renderContent = () => {
        switch (selectedOption) {
            case 'overview':
                return <OverviewEmployer />;
            // case 'employers Profile':
            //     return <div>Employers Profile</div>;
            case 'pricing and billing':
                return <PricesAndBilling />;
            case 'post a Job':
                return <PostJobForm />;
            case 'saved Candidates':
                return <SavedCandidate />;

            case 'my Jobs':
                return <MyJobCard />;
            case 'settings':
                return <SettingEmployer />;
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    return (
        <div className="dashboard-container">

            <div className="sidebar">
                <div className="sidebar-header">
                    <p>Employers Dashboard</p>
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option.id}
                                className={`sidebar-option ${selectedOption === option.id ? 'active' : ''}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <span className="icon">{option.icon}</span>
                                <span>{option.label}</span>
                                {option.badge && <span className="badge">{option.badge}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="logout-button">
                    <img src="../images/logout.png" />
                    Logout
                </button>
            </div>

            {/* Content */}
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default DashboardEmployer;
