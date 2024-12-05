import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./PostJobForm.css";

const PostJobForm = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    responsibilities: "",
    company_name: "",
    location: "",
    salary: "",
    job_type: "onsite",
    job_domain: "web_dev",
    skills_required: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (field, value) => {
    setJobData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
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
      for (const key in jobData) {
        formData.append(key, jobData[key]);
      }

      const response = await fetch("http://127.0.0.1:8000/api/post-job/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const newJob = await response.json();
        console.log("Job posted successfully:", newJob);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        console.error("Error posting job:", errorData);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  if (!isLoggedIn) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="form-container">
      <h1>Post Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the job title"
            value={jobData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            placeholder="Enter the company name"
            value={jobData.company_name}
            onChange={handleChange}
          />
        </div>
        <div className="more-options">
          <div className="salary-field">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              placeholder="Enter the salary"
              value={jobData.salary}
              onChange={handleChange}
            />
          </div>
          <div className="job-type-field">
            <label htmlFor="job_type">Job Type</label>
            <select
              id="job_type"
              name="job_type"
              value={jobData.job_type}
              onChange={handleChange}
            >
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <div className="location-field">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter the location"
              value={jobData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="job-domain">
          <label htmlFor="job_domain">Job Domain</label>
          <select
            id="job_domain"
            name="job_domain"
            value={jobData.job_domain}
            onChange={handleChange}
          >
            <option value="web_dev">Web Development</option>
            <option value="mobile_dev">Mobile Development</option>
            <option value="ai_ml">AI & ML</option>
            <option value="data_science">Data Science</option>
            <option value="cyber_security">Cyber Security</option>
          </select>
        </div>
        <div className="skills-required">
          <label htmlFor="skills_required">Skills Required</label>
          <input
            type="text"
            id="skills_required"
            name="skills_required"
            placeholder="Enter the skills required"
            value={jobData.skills_required}
            onChange={handleChange}
          />
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>
          <ReactQuill
            value={jobData.description}
            onChange={(value) => handleQuillChange("description", value)}
            placeholder="Write job's description here..."
          />
        </div>
        <div className="responsibilities">
          <label htmlFor="responsibilities">Responsibilities</label>
          <ReactQuill
            value={jobData.responsibilities}
            onChange={(value) => handleQuillChange("responsibilities", value)}
            placeholder="Write job's responsibilities here..."
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostJobForm;
