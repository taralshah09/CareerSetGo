import React, { useState } from 'react';
import './DashboardEmployer.css';
import { FaLayerGroup, FaBriefcase, FaCircle, FaCog, FaBookmark, FaSignOutAlt, FaUserCircle, FaListUl, FaRegIdCard } from 'react-icons/fa';
import OverviewEmployer from '../../components/OverviewEmployer/OverviewEmployer';
import PostJobForm from '../PostJobForm/PostJobForm';
const DashboardEmployer = () => {
    const [selectedOption, setSelectedOption] = useState('overview');

    const options = [

        { id: 'overview', label: 'Overview', icon: <FaLayerGroup /> },
        { id: 'employers Profile', label: 'Employers Profile', icon: <FaUserCircle /> },
        { id: 'post a Job', label: 'Post a Job', icon: <FaCircle /> },
        { id: 'my Jobs', label: 'My Jobs', icon: <FaBriefcase /> },
        { id: 'saved Candidates', label: 'Saved Candidates', icon: <FaBookmark /> },
        { id: 'all Companies', label: 'All Companies', icon: <FaRegIdCard /> },
        { id: 'settings', label: 'Settings', icon: <FaCog /> },
    ];

    const renderContent = () => {
        switch (selectedOption) {
            case 'overview':
                return <OverviewEmployer />;
            case 'employers Profile':
                return <div>Employers Profile</div>;
            case 'post a Job':
                return <PostJobForm />;
            case 'saved Candidates':
                return <div>savedCandidates</div>;
            case 'plans & Billing':
                return <div>plans&Billing</div>;
            case 'all Companies':
                return <div>allCompanies</div>;
            case 'my Jobs':
                return <div>myJobs</div>;
            case 'settings':
                return <div>setting</div>;
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
