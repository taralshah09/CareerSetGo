import React, { useState } from 'react';
import "./Personal.css";

const Personal = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
            const newFile = { name: file.name, size: fileSize };
            setUploadedFiles([...uploadedFiles, newFile]);
        }
    };

    const handleProfilePictureUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            const imageURL = URL.createObjectURL(file);
            setProfilePicture(imageURL);
        }
    };

    const handleDelete = (index) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);
    };

    return (
        <div className='personal'>
            <div className="basic-info">
                <div className="basic-info-header">
                    <p>Basic Info</p>
                </div>
                <form className="basic-info-content">
                    <div className="basic-info-content-left">
                        <p>Profile Picture</p>
                        <div className="file-box">
                            <label htmlFor="profilePicture">
                                <img src="../images/upload.png" alt="" />
                                <p>Browse Photo or drop here</p>
                                <span>
                                    A photo larger than 400 pixels works best. Max photo size 5MB.
                                </span>
                            </label>
                            <input type="file" id="profilePicture" accept=".png, .jpg, .jpeg" onChange={handleProfilePictureUpload} />
                        </div>
                        {profilePicture && (
                            <div className="profile-picture-preview">
                                <p>Profile Preview:</p>
                                <img src={profilePicture} alt="Profile Preview" className="preview-image" />
                            </div>
                        )}
                    </div>
                    <div className="basic-info-content-right">
                        <div className="top">
                            <div className='top-left'>
                                <label htmlFor="name">
                                    Full Name
                                </label>
                                <input type="text" id='name' />
                            </div>
                            <div className='top-right'>
                                <label htmlFor="title">
                                    Title/Headline
                                </label>
                                <input type="text" id='title' />
                            </div>
                        </div>
                        <div className="mid-1">
                            <div className="mid-1-left">
                                <label htmlFor="experience">Experience</label>
                                <select name="experience" id="experience">
                                    <option value="10">10+ years</option>
                                    <option value="5">5+ years</option>
                                    <option value="3">3+ years</option>
                                    <option value="1">1+ years</option>
                                    <option value="0">No Experience</option>
                                </select>
                            </div>
                            <div className="mid-1-right">
                                <label htmlFor="education">Education</label>
                                <select name="education" id="education">
                                    <option value="Masters">Masters</option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="HSC">H.S.C.</option>
                                    <option value="SSC">S.S.C</option>
                                    <option value="School Dropout">School Dropout</option>
                                </select>
                            </div>
                        </div>
                        <div className="mid-2">
                            <label htmlFor="personal-website">Personal Website</label>
                            <input type="text" placeholder='Website Url' />
                        </div>
                        <div className="bottom">
                            <button type="submit">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="cv-resume">
                <div className="cv-resume-header">
                    <p>Your CV/Resume</p>
                </div>
                <div className="cv-resume-content">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="resume-item">
                            <p>{file.name}</p>
                            <span>{file.size}</span>
                            <div className="resume-actions">
                                <button>Edit Resume</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <div className="add-resume">
                        <label htmlFor="addResume">
                            <p>Add CV/Resume</p>
                            <span>Browse file or drop here, only pdf</span>
                        </label>
                        <input type="file" id="addResume" accept=".pdf" onChange={handleFileUpload} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personal;
