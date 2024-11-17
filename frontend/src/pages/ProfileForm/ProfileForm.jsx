import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/fetchWithAuth"; // Adjust the import path accordingly
import "./ProfileForm.css";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    skills: "",
    education: "",
    age: "",
    experience: "",
    twitter_link: "",
    linkedin_link: "",
    insta_link: "",
    other_link: "",
    location: "",
    role: "",
    phone_no: "",
    domain_of_interest: "",
    job_type: "",
    resume: null,  // Set initial value to null for file input
    profile_picture: null, // Set initial value to null for file input
  });

  useEffect(() => {
    fetchWithAuth("http://127.0.0.1:8000/api/user/profile/")
      .then((data) => {
        if (data.profile) {
          setProfileData({ ...data.profile, resume: null, profile_picture: null });
        } else {
          console.error("Profile data not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile data", error);
      });
  }, []);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file, set it to files[0]
    if (name === "resume" || name === "profile_picture") {
      setProfileData({
        ...profileData,
        [name]: files[0],
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No JWT token found!");
      return;
    }

    try {
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      let response;
      const profileResponse = await fetch("http://127.0.0.1:8000/api/user/profile/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const requestConfig = {
        method: profileResponse.ok ? "PUT" : "POST", // Use POST when creating new profile
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      };

      response = await fetch("http://127.0.0.1:8000/api/user/profile/", requestConfig);

      if (response.ok) {
        const updatedProfile = await response.json();
        console.log("Profile saved successfully:", updatedProfile);
        setProfileData(updatedProfile);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error saving profile:", errorData);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="container">
      <div className="profile-container">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {Object.keys(profileData).map((field) => (
            <div key={field} className="form-group">
              <label>
                {field.replace("_", " ").toUpperCase()}:
                {field === "resume" || field === "profile_picture" ? (
                  <input
                    type="file"
                    name={field}
                    onChange={handleChange}
                    accept={field === "resume" ? ".pdf,.docx,.doc" : "image/*"}
                  />
                ) : (
                  <input
                    type={field === "age" ? "number" : "text"}
                    name={field}
                    value={profileData[field]}
                    onChange={handleChange}
                  />
                )}
              </label>
            </div>
          ))}
          <button type="submit" className="submit-button">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
