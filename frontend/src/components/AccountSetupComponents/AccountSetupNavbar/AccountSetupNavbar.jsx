import React from "react";
import { FaUserAlt, FaBuilding, FaGlobe, FaPhoneAlt } from "react-icons/fa"; 

import "./AccountSetupNavbar.css";

const AccountSetupNavbar = ({ activeItem, onItemSelect }) => {
    const navItems = [
        { id: "companyInfo", label: "Company Info", icon: <FaUserAlt /> },
        { id: "foundingInfo", label: "Founding Info", icon: <FaBuilding /> }, 
        { id: "socialMedia", label: "Social Media Info", icon: <FaGlobe /> }, 
        { id: "contact", label: "Contact", icon: <FaPhoneAlt /> }, 
      ];
    
      return (
        <div className="nav-bar">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeItem === item.id ? "active" : ""}`}
              onClick={() => onItemSelect(item.id)}
            >
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      );
};

export default AccountSetupNavbar;
