import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../utils/fetchWithAuth"; 
import "./PostJobForm.css";

const PostJobForm = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    salary: "",
    job_type: "onsite", // default value
    job_domain: "web_dev", // default value
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
    const { name, value, files } = e.target;

    // If the input is a file, set it to files[0]
    if (name === "resume") {

        
      setJobData({
        ...jobData,
        [name]: files[0],
      });
    } else {
      setJobData({
        ...jobData,
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
      for (const key in jobData) {
        formData.append(key, jobData[key]);
      }

      const response = await fetch("http://127.0.0.1:8000/api/post-job/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
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
    // While redirecting, we return null or a loading indicator
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="container">
      <div className="post-job-container">
        <h2>Post a Job</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {Object.keys(jobData).map((field) => (
            <div key={field} className="form-group">
              <label>
                {field.replace("_", " ").toUpperCase()}:
                {field === "resume" ? (
                  <input
                    type="file"
                    name={field}
                    onChange={handleChange}
                    accept=".pdf,.docx,.doc"
                  />
                ) : field === "job_type" || field === "job_domain" ? (
                  <select
                    name={field}
                    value={jobData[field]}
                    onChange={handleChange}
                  >
                    {field === "job_type" ? (
                      <>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="remote">Remote</option>
                      </>
                    ) : (
                      <>
                        <option value="web_dev">Web Development</option>
                        <option value="mobile_dev">Mobile Development</option>
                        <option value="ai_ml">AI & ML</option>
                        <option value="data_science">Data Science</option>
                        <option value="cyber_security">Cyber Security</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={jobData[field]}
                    onChange={handleChange}
                  />
                )}
              </label>
            </div>
          ))}
          <button type="submit" className="submit-button">Post Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;
