import React, { useEffect, useState } from 'react';
import './VerifySkills.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const VerifySkills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/user/profile/');
        if (response.status === 200) {
          const data = response.data;
          console.log('Profile fetched:', data);

          // Parse skills data
          let skillsData = [];
          if (data.skills) {
            skillsData = Array.isArray(data.skills)
              ? data.skills
              : typeof data.skills === 'string'
              ? JSON.parse(data.skills)
              : [];
          }
          setSkills(skillsData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]); // Empty dependency array ensures this runs only once

  const skillNames = skills.map((skill) => skill.name);
  console.log('Skill Names:', skillNames);

  const redirectToVerifyPage = (skillname) => {
    navigate(`/verify/${skillname}`);
  };

  return (
    <div className="container">
      <h2 className="header-title">Skills Overview</h2>
      <div className="skills-container">
        {skills.length > 0 ? (
          <table className="skills-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Score</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="skill-name">{skill.name.toUpperCase()}</td>
                  <td>{skill.score} / 10</td>
                  <td>
                    {skill.verified ? (
                      'Yes'
                    ) : (
                      <button
                        onClick={() => redirectToVerifyPage(skill.name.toLowerCase())}
                        className="verify-btn"
                      >
                        Get verified
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No skills to display.</p>
        )}
      </div>
    </div>
  );
};

export default VerifySkills;