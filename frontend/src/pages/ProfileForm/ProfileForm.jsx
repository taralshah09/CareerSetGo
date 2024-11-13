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
  });
  useEffect(() => {
    fetchWithAuth("http://127.0.0.1:8000/api/user/profile/")
      .then((data) => {
        if (data.profile) {
          setProfileData(data.profile);
        } else {
          console.error("Profile data not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile data", error);
      });
  }, []);
  
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve JWT from localStorage
    const token = localStorage.getItem("access_token");
  
    if (!token) {
      console.error("No JWT token found!");
      return;
    }
  
    try {
      let response;
  
      // Check if the profile exists for the current user (GET request)
      const profileResponse = await fetch("http://127.0.0.1:8000/api/user/profile/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (profileResponse.ok) {
        // Profile exists, so send a PUT request to update the profile
        response = await fetch("http://127.0.0.1:8000/api/user/profile/", {
          method: "PUT",  // PUT request to update the profile
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        });
      } else if (profileResponse.status === 404) {
        // Profile does not exist, so send a POST request to create the profile
        response = await fetch("http://127.0.0.1:8000/api/user/profile/", {
          method: "POST",  // POST request to create a new profile
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        });
      } else {
        console.error("Error fetching user profile data");
        return;
      }
  
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
        <form onSubmit={handleSubmit}>
          {Object.keys(profileData).map((field) => (
            <div key={field}>
              <label>
                {field.replace("_", " ").toUpperCase()}:
                <input
                  type={field === "age" ? "number" : "text"}
                  name={field}
                  value={profileData[field]}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}
          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
