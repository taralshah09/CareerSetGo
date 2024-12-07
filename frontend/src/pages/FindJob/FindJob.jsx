import React, { useEffect, useState } from "react";
import "./FindJob.css";
import { Link } from "react-router-dom";

const FindJob = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
          const response = await fetch("http://127.0.0.1:8000/api/jobs/", {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  // Include token if user is authenticated
                  'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : '',
              },
          });
  
          if (response.ok) {
              const data = await response.json();
              setJobs(data.jobs);  // Update state with fetched job data
          } else {
              const errorData = await response.json();
              console.error('Error fetching jobs:', errorData);
          }
      } catch (error) {
          console.error('Error fetching jobs:', error);
      }
  };
  

    fetchJobs(); // Fetch jobs when the component mounts
  }, []);

  return (
    <div className="find-job-container">
      <div className="find-job-search">
        <div className="find-job-search-header">
          <p>Find Job</p>
        </div>
        <div className="input-box">
          <div className="input-box-1">
            <img src="../images/search.png" alt="Search Icon" />
            <input type="text" placeholder="Job title, keyword..." />
          </div>
          <div className="input-box-2">
            <img src="../images/location.png" alt="Location Icon" />
            <input type="text" placeholder="Location" />
          </div>
          <div className="input-box-3">
            <img src="../images/layers.png" alt="Category Icon" />
            <select name="category" id="category" style={{ border: "none" }}>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Devops Developer">Devops Developer</option>
            </select>
          </div>
          <div className="input-box-4">
            Advanced Filter
          </div>
          <button>Find Job</button>
        </div>
      </div>
      <div className="jobs-container">
        <div className="jobs-feed">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Link to={`/job/${job.job_id}`} style={{textDecoration:"none",color:"black"}}>
              <div className="job" key={job.job_id}>
                <div className="job-header">
                  <div className="job-header-left">
                    <img src="../images/c1.png" alt="Company Logo" />
                  </div>
                  <div className="job-header-right">
                    <div className="job-header-right-top">
                      <p>{job.company_name}</p>
                      <span>{job.featured ? "Featured" : "Standard"}</span>
                    </div>
                    <div className="job-header-right-bottom">
                      <img src="../images/location.png" alt="Location Icon" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="job-footer">
                  <p>{job.title}</p>
                  <div className="job-footer-bottom">
                    <span>{job.job_type}</span>
                    <span>{job.salary ? `$${job.salary}` : "Not disclosed"}</span>
                  </div>
                </div>

              </div>
              </Link>

            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
        <div className="jobs-pagination">
          {/* Pagination logic can be implemented here */}
        </div>
      </div>
    </div>
  );
};

export default FindJob;
