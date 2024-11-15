import React, { useState } from 'react';
import './Dashboard.css';
import { FaLayerGroup, FaBriefcase, FaHeart, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Overview from '../../components/Overview/Overview';
import AppliedJobs from '../../components/AppliedJobs/AppliedJobs';
import FavJobs from '../../components/FavJobs/FavJobs';
import JobAlerts from '../../components/JobAlerts/JobAlerts';
import SettingsComp from "../../components/SettingsComp/SettingsComp"
const Dashboard = () => {
    const [selectedOption, setSelectedOption] = useState('overview');

    const options = [
        { id: 'overview', label: 'Overview', icon: <FaLayerGroup /> },
        { id: 'appliedJobs', label: 'Applied Jobs', icon: <FaBriefcase /> },
        { id: 'favoriteJobs', label: 'Favorite Jobs', icon: <FaHeart /> },
        { id: 'jobAlert', label: 'Job Alert', icon: <FaBell /> },
        { id: 'settings', label: 'Settings', icon: <FaCog /> },
    ];

    const renderContent = () => {
        switch (selectedOption) {
            case 'overview':
                return <Overview />;
            case 'appliedJobs':
                return <AppliedJobs />;
            case 'favoriteJobs':
                return <FavJobs />;
            case 'jobAlert':
                return <JobAlerts />;
            case 'settings':
                return <SettingsComp />;
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <p>Candidate Dashboard</p>
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

export default Dashboard;
