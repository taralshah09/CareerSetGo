import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import "./CompanyInfo.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CompanyInfo = () => {
  const [biography, setBiography] = useState("");

  const handleBiographyChange = (value) => {
    setBiography(value);
  };

  return (
      <div className="main-content" style={{textAlign : "left"}}>
        <form action="">
        <div className="upload-section">
          <h3>Logo & Banner Image</h3>
          <div className="upload-container">
            {/* Logo Upload */}
            <div className="upload-item">
              <label className="upload-label" htmlFor="logoUpload">
                Upload Document
              </label>
              <div className="file-box file-box-1">
                <label htmlFor="logoUpload">
                  <img src="../images/upload.png" alt="Upload Icon" />
                  <p>Browse photo or drop here</p>
                  <span>
                    A photo larger than 400 pixels works best. Max photo size 5
                    MB.
                  </span>
                </label>
                <input type="file" id="logoUpload" accept=".png, .jpg, .jpeg" required/>
              </div>
            </div>

            {/* Banner Image Upload */}
            <div className="upload-item">
              <label className="upload-label" htmlFor="bannerUpload">
                Banner Image
              </label>
              <div className="file-box file-box-2">
                <label htmlFor="bannerUpload">
                  <img src="../images/upload.png" alt="Upload Icon" />
                  <p>Browse photo or drop here</p>
                  <span>
                    Banner images optimal dimension 1520×400. Supported format
                    JPEG, PNG. Max photo size 5 MB.
                  </span>
                </label>
                <input type="file" id="bannerUpload" accept=".png, .jpg, .jpeg" required/>
              </div>
            </div>
          </div>
        </div>

        {/* Company Name and About Us */}
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id="companyName" required/>
          </div>
          <div className="form-group">
            <label htmlFor="aboutUs">About Us</label>
            <ReactQuill
              id="aboutUs"
              required
              placeholder="Write down about your company here. Let the candidate know who we are..."
              value={biography}
              onChange={handleBiographyChange}
              modules={{
                toolbar: [
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ list: "ordered" }, { list: "bullet" }],
                ],
              }}
              theme="snow"
            />
          </div>
        </div>
        <br /><br />
        <div className="action-section">
          <button className="save-btn">
            Save & Next <FaArrowRight className="arrow-icon" />
          </button>
        </div>
        </form>
      </div>
  );
};

export default CompanyInfo;
