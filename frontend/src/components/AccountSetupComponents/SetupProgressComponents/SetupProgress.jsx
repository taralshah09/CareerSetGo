import React from "react";
import "./SetupProgress.css";

const SetupProgress = () => {
  return (
    <div className="setup-progress">
      <p>Setup Progress</p>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

export default SetupProgress;
