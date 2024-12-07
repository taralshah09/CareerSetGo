import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";  // Import useNavigate
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [retryCount, setRetryCount] = useState(0); // Retry counter to handle retry logic
  const maxRetries = 3; // Maximum number of retries

  const location = useLocation();
  const navigate = useNavigate();  // Initialize useNavigate hook
  const skillGapResult = location.state?.skillGapResult;
  const missingSkills = skillGapResult?.missing_skills || ["JavaScript", "CSS"];

  const API_KEY = "AIzaSyAz4OZQuNKv0ounGH_bKG4G1Zu6UzOQK80";
  const maxResults = 5;

  useEffect(() => {
    if (!selectedSkill && missingSkills.length > 0) {
      setSelectedSkill(missingSkills[0]);
    }
  }, [missingSkills]);

  const fetchVideos = async (retries = 0) => {
    try {
      setIsLoading(true);

      // Dynamically adjust query based on skill type (tech vs non-tech)
      let query;
      if (selectedSkill) {
        // For technical skills (e.g., JavaScript, Python, etc.)
        const techSkills = ["JavaScript", "Python", "React", "CSS", "Node.js"];
        if (techSkills.includes(selectedSkill)) {
          query = `${selectedSkill} programming tutorial`;
        } else {
          // For non-technical skills (e.g., Communication, Leadership)
          query = `${selectedSkill} course`;
        }
      }

      // URL encode the query
      const encodedQuery = encodeURIComponent(query);

      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          key: API_KEY,
          part: "snippet",
          type: "video",
          q: encodedQuery,
          maxResults,
        },
      });

      setCourses(response.data.items);
      setError(null); // Reset any previous error on successful request
    } catch (err) {
      console.error("Error fetching data:", err);  // Log the error for debugging
      if (retries < maxRetries) {
        setRetryCount(retries + 1);
        setTimeout(() => fetchVideos(retries + 1), 1000 * retries);
      } else {
        setError("Error fetching courses. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSkill) {
      fetchVideos();
    }
  }, [selectedSkill]);

  const renderCourses = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-text">Loading courses...</div>
        </div>
      );
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <div className="courses-grid">
        {courses.map((video) => (
          <div key={video.id.videoId} className="course-card fade-in">
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="course-link"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="course-thumbnail"
              />
              <div className="course-content">
                <h3 className="course-title">
                  {video.snippet.title}
                </h3>
                <p className="course-description">
                  {video.snippet.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="course-container">
      <div className="header-section">
        <button
          className="back-button"
          onClick={() => navigate(-1)}  // Navigate back to previous page
        >
          <i className="fa-solid fa-arrow-left"></i>
          Back
        </button>
        <h1 className="main-title">Recommended Courses</h1>

        <div className="skills-nav">
          {missingSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`skill-button ${selectedSkill === skill
                ? 'skill-button-active'
                : 'skill-button-inactive'
                }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {selectedSkill && (
          <h2 className="selected-skill-title">
            Learning Resources for {selectedSkill}
          </h2>
        )}

        {renderCourses()}
      </div>
    </div>
  );
};

export default Courses;
