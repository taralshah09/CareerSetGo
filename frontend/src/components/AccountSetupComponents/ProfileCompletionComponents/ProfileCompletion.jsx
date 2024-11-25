import React from "react";
import "./ProfileCompletion.css";
import Footer from '../AccountSetupFooter/AccountSetupFooter';
import SetupProgress from "../SetupProgressComponents/SetupProgress";
import Logo from "../../Logo";
import { FaArrowRight } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";

const ProfileCompletion = () => {
  return (
    <div className="profile-completion-container">

      <div className="profilecompletion">
      <div className="header">
        <div className="logo">
          <Logo />
        </div>
        <SetupProgress />
      </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="icon-container">
          <div className="check-icon"><BiCheckDouble className="check-icon"/></div>
        </div>
        <h2>🎉 Congratulations, Your profile is 100% complete!</h2>
        <p>
          Donec hendrerit, ante mattis pellentesque eleifend, tortor urna malesuada
          ante, eget aliquam nulla augue hendrerit ligula. Nunc mauris arcu, mattis sed
          sem vitae.
        </p>
        <div className="button-group">
          <button className="view-dashboard">View Dashboard</button>
          <button className="post-job">Post Job <FaArrowRight className="arrow-icon" /></button>
        </div>
      </div>

      
      <Footer></Footer>
    </div>
  );
};

export default ProfileCompletion;
