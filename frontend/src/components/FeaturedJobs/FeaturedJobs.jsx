import React, { useEffect, useState } from "react";
import "./FeaturedJobs.css";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]); // State to hold jobs data
  const [wishlist, setWishlist] = useState(new Set()); // Track saved jobs

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/recent-jobs/');
        const data = await response.json();
        console.log(data);  // Check if data is received correctly
        setJobs(data);  // Update the state with the fetched jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();  // Fetch jobs when the component mounts
  }, []);

  // Function to add a job to the wishlist
  const addToWishlist = async (jobId) => {
    console.log('Job ID:', jobId);  // Log the jobId to see if it's undefined
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No JWT token found!');
      return;
    }

    if (!jobId) {
      console.error('Job ID is undefined!');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/wishlist/add/${jobId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Error adding to wishlist:', text);
        return;
      }

      const data = await response.json();
      console.log('Job added to wishlist successfully:', data);
      
      // Update wishlist state to add the job_id
      setWishlist((prevWishlist) => new Set(prevWishlist).add(jobId));
    } catch (error) {
        console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className="featured-job">
      <div className="featured-job-header">
        <h2>Featured Job</h2>
        <button>
          View All <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="featured-job-footer">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            console.log(job.job_id),
            <div className="job-box" key={job.job_id}>
              <div className="img-box">
                <img src="../images/c1.png" alt="" />
              </div>
              <div className="info-box">
                <div className="info-box-header">
                  <div className="text">
                    <p>{job.title}</p>
                    <button>{job.job_type}</button>
                  </div>
                </div>
                <div className="info-box-footer">
                  <div className="location">
                    <img src="../images/location1.png" alt="" />
                    <p>{job.location}</p>
                  </div>
                  <div className="salary">
                    <img src="../images/dollar1.png" alt="" />
                    <p>{job.salary ? `$${job.salary}` : "Not disclosed"}</p>
                  </div>
                  <div className="time-left">
                    <img src="../images/calender.png" alt="" />
                    <p>{`Posted ${Math.floor(
                      (new Date() - new Date(job.created_at)) / (1000 * 3600 * 24)
                    )} days ago`}</p>
                  </div>
                </div>
              </div>
              <div className="btn-box">
                <button>
                  Apply Now <i className="fa-solid fa-arrow-right"></i>
                </button>
                <button
                  className={`save-btn ${wishlist.has(job.job_id) ? "saved" : ""}`}
                  onClick={() => addToWishlist(job.job_id)}
                >
                  {wishlist.has(job.job_id) ? "Saved" : "Save to Wishlist"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No featured jobs available</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
