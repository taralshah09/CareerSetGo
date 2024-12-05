import React, { useState } from "react";
import Navbar from "../../components/AccountSetupComponents/AccountSetupNavbar/AccountSetupNavbar.jsx";
import CompanyInfo from '../../components/AccountSetupComponents/CompanyInfoComponents/CompanyInfo.jsx';
import FoundingInfo from '../../components/AccountSetupComponents/FoundingInfoComponents/FoundingInfo.jsx';
import SocialMediaInfo from '../../components/AccountSetupComponents/SocialMediaInfoComponents/SocialMediaInfo.jsx';
import Contact from '../../components/AccountSetupComponents/ContactComponents/Contact.jsx';
import SetupProgress from '../../components/AccountSetupComponents/SetupProgressComponents/SetupProgress.jsx';
import Logo from "../../components/Logo.jsx";
import Footer from '../../components/AccountSetupComponents/AccountSetupFooter/AccountSetupFooter.jsx';
import './AccountSetup.css';
import { FaUserAlt, FaBuilding, FaGlobe, FaPhoneAlt } from "react-icons/fa";

export default function AccountSetup() {
    const navItems = [
        { id: "companyInfo", label: "Company Info", icon: <FaUserAlt /> },
        { id: "foundingInfo", label: "Founding Info", icon: <FaBuilding /> },
        { id: "socialMedia", label: "Social Media Info", icon: <FaGlobe /> },
        { id: "contact", label: "Contact", icon: <FaPhoneAlt /> },
    ];
    const [activeTab, setActiveTab] = useState("companyInfo");

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "companyInfo":
                return <CompanyInfo />;
            case "foundingInfo":
                return <FoundingInfo />;
            case "socialMedia":
                return <SocialMediaInfo />;
            case "contact":
                return <Contact />;
            default:
                return <CompanyInfo />;
        }
    };

    return (
        <div className="account-setup">
            <div className="header">
                <div className="logo">
                    <Logo />
                </div>
                <SetupProgress />
            </div>

            {/* Navigation Bar */}
            <div className="navbar-wrapper">
                <div className="nav-bar">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                            onClick={() => handleTabChange(item.id)}
                        >
                            {item.icon && <span className="nav-icon">{item.icon}</span>}
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content" style={{ textAlign: "left" }}>
                {renderContent()}
            </div>
            <Footer></Footer>
        </div>
    );
}
