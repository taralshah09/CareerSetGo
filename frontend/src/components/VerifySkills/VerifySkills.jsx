import React, { useEffect, useState } from 'react';
import './VerifySkills.css'; // Import the CSS file
import { useNavigate } from "react-router-dom"

const VerifySkills = () => {
    const [skills, setSkills] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSkills(Array.isArray(data.skills)
                        ? data.skills
                        : typeof data.skills === 'string'
                            ? JSON.parse(data.skills)
                            : []);
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchData();
    }, []);

    const redirectToVerifyPage = (skillname) => {
        navigate(`/verify/${skillname}`)
    }
    return (
        <div className="container">
            <h2 className="header-title">Skills Overview</h2>
            <div className='skills-container'>

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
                                    <td className='skill-name'>{skill.name.toUpperCase()}</td>
                                    <td>{skill.score} / 10</td>
                                    <td>{skill.verified ? 'Yes' : <button onClick={() => redirectToVerifyPage(skill.name.toLowerCase())} className='verify-btn'>Get verified</button>}</td>
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
