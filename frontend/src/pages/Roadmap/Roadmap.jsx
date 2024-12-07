import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './roadmap.css';
import html2pdf from 'html2pdf.js';
import { Button, CircularProgress } from '@mui/material';


const Roadmap = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const skillGapResult = location?.state || {};
    const missingSkills = skillGapResult.skillGapResult?.missing_skills || [];
    const { user } = useAuth();

    const [months, setMonths] = useState(3);
    const [hoursPerDay, setHoursPerDay] = useState(2);
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getRoadmap = async () => {
        if (!missingSkills || !missingSkills.length) {
            setError('No missing skills to generate a roadmap.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI('AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U');
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            const prompt = `
            Create a structured ${months}-month learning roadmap for these skills: ${missingSkills.join(', ')}.
            Format your response exactly as follows, with ${months * 4} weeks total. First, finish Skill 1 completely, and then proceed with the other missing skills in order. Each task should include detailed descriptions and relevant resources, such as YouTube links or official documentation. For each task, ensure the resources are appropriate for each skill and level of difficulty.
            
            Month 1:
            Week 1:
                - Task 1: Detailed task description for Skill 1, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 1, including relevant YouTube links or documentation.
            Week 2:
                - Task 1: Detailed task description for Skill 1, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 1, including relevant YouTube links or documentation.
            Week 3:
                - Task 1: Detailed task description for Skill 1, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 1, including relevant YouTube links or documentation.
            Week 4:
                - Task 1: Detailed task description for Skill 1, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 1, including relevant YouTube links or documentation.
            
            Month 2:
            Week 1:
                - Task 1: Detailed task description for Skill 2, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 2, including relevant YouTube links or documentation.
            Week 2:
                - Task 1: Detailed task description for Skill 2, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 2, including relevant YouTube links or documentation.
            Week 3:
                - Task 1: Detailed task description for Skill 2, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 2, including relevant YouTube links or documentation.
            Week 4:
                - Task 1: Detailed task description for Skill 2, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 2, including relevant YouTube links or documentation.
            
            Month 3:
            Week 1:
                - Task 1: Detailed task description for Skill 3, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 3, including relevant YouTube links or documentation.
            Week 2:
                - Task 1: Detailed task description for Skill 3, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 3, including relevant YouTube links or documentation.
            Week 3:
                - Task 1: Detailed task description for Skill 3, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 3, including relevant YouTube links or documentation.
            Week 4:
                - Task 1: Detailed task description for Skill 3, including relevant YouTube links or documentation.
                - Task 2: Detailed task description for Skill 3, including relevant YouTube links or documentation.
            
            Continue this exact pattern for all ${months} months, with 4 weeks per month.
            For each task, allocate approximately ${hoursPerDay} hours per day of work.
            Ensure the tasks are progressively challenging, starting from the basics and moving to more complex concepts.
            
            Please provide links to high-quality resources such as:
            - YouTube videos with a high view count and good feedback.
            - Official documentation or tutorials.
            - Free or well-established platforms like freeCodeCamp, MDN, W3Schools, etc.
            
            Ensure that each task is actionable and clearly guides the learner toward mastery.

            in the response month is supposed to be in h1 where as week be in h2 
            `;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            setRoadmap(responseText); // Directly set the response text as the roadmap content
        } catch (error) {
            console.error('Error generating roadmap:', error);
            setError('Failed to generate roadmap. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        const element = document.querySelector('.roadmap-content'); // Target only the roadmap content

        const options = {
            margin: 10,
            filename: 'roadmap.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(options).save();
    };

    return (
        <div className="roadmap-container">
            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>
            <div className="roadmap-card">
                <h1 className="roadmap-title">Personalized Learning Roadmap</h1>
                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="months" className="input-label">
                            Number of Months
                        </label>
                        <input
                            id="months"
                            type="number"
                            className="input-field"
                            value={months}
                            onChange={(e) => setMonths(Math.max(1, Math.min(12, Number(e.target.value))))}
                            min="1"
                            max="12"
                        />
                    </div>
                    <div className="input-item">
                        <label htmlFor="hours" className="input-label">
                            Hours Per Day
                        </label>
                        <input
                            id="hours"
                            type="number"
                            className="input-field"
                            value={hoursPerDay}
                            onChange={(e) => setHoursPerDay(Math.max(1, Math.min(24, Number(e.target.value))))}
                            min="1"
                            max="24"
                        />
                    </div>
                </div>

                {/* <button
                    onClick={getRoadmap}
                    disabled={loading}
                    className={`generate-button ${loading ? 'loading' : ''}`}
                >
                    {loading ? 'Generating Roadmap...' : 'Generate Roadmap'}
                </button> */}

                <Button
                    onClick={getRoadmap}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    className={`generate-button ${loading ? 'loading' : ''}`}
                    startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
                >
                    {loading ? 'Generating Roadmap...' : 'Generate Roadmap'}
                </Button>

                {error && <div className="error-message">{error}</div>}

                {roadmap && (
                    <div className="roadmap-content">
                        <ReactMarkdown className="markdown-content">{roadmap}</ReactMarkdown>
                    </div>
                )}

                {roadmap && (
                    <button onClick={handleDownloadPDF} className="download-pdf-button">
                        Download PDF
                    </button>
                )}

            </div>
        </div>
    );
};

export default Roadmap;
