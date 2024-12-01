import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"
import "./ChoicesGame.css"
import ReactMarkdown from "react-markdown";

const ChoicesGame = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [predictLoading, setPredictLoading] = useState(false);

    // Define the skills array
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        headline: "",
        experience: "",
        education: "",
        personalWebsite: "",
        resume: null,
        nationality: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        biography: "",
        skills: [],
        domainOfInterest: [],
        certifications: [""],
        preferredWorkEnvironment: "",
        availabilityStatus: "",
        languages: "",
        location: "",
    });
    const [profileData, setProfileData] = useState(null);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/api/user/profile/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setFormData((prev) => ({
                        ...prev,
                        fullName: data.fullname || "",
                        headline: data.title || "",
                        experience: data.experience || "",
                        education: data.education || "",
                        personalWebsite: data.personal_website || "",
                        nationality: data.nationality || "",
                        dateOfBirth: data.date_of_birth || "",
                        gender: data.gender || "",
                        maritalStatus: data.marital_status || "",
                        biography: data.biography || "",
                        skills: Array.isArray(data.skills)
                            ? data.skills
                            : typeof data.skills === "string"
                                ? JSON.parse(data.skills)
                                : [],
                        domainOfInterest: data.domain_of_interest
                            ? data.domain_of_interest.split(",")
                            : [],
                        certifications: data.certifications
                            ? data.certifications.split(",")
                            : [""],
                        preferredWorkEnvironment:
                            data.preferred_work_environment || "",
                        availabilityStatus: data.availability_status || "",
                        languages: data.languages || "",
                        location: data.location || "",
                    }));
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    useEffect(() => {
        if (formData.skills) {
            setSkills(formData.skills.map((skill) => skill.name || skill));
        }
    }, [formData.skills]);

    const cleanJsonString = (str) => {
        str = str.replace(/```(json|javascript)?\n?/g, '');
        str = str.replace(/```/g, '');
        return str.trim();
    };

    const getResponse = async () => {
        setLoading(true);
        setError(null);
        setPrediction("");
        setSelectedAnswers({});
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Generate questions based on these frontend development skills: ${skills.join(', ')}.
            Create an array of ${skills.length} objects where:
            - Each object should focus on one skill from the skills array
            - Each object should have a unique id, question text about that specific skill, and 3 choices
            - The questions should be about career progression, skill improvement, or practical applications
            - The choices should represent different approaches or strategies related to that skill
            
            Return only a valid JSON array like this example (no additional text or markdown):
            [
              {
                "id": 1,
                "skill": "React.js",
                "question": "How would you like to advance your React.js knowledge?",
                "choices": [
                  "Master advanced state management and performance optimization",
                  "Focus on React Native for mobile development",
                  "Learn newer React features and patterns"
                ]
              }
            ]`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            const cleanedJson = cleanJsonString(responseText);
            const generatedQuestions = JSON.parse(cleanedJson);
            setQuestions(generatedQuestions);
        } catch (error) {
            console.error("Error getting AI response:", error);
            setError("Failed to generate questions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChoiceSelect = (questionId, choiceIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: choiceIndex
        }));
    };

    const getPrediction = async () => {
        setPredictLoading(true);
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyD3rn502lgtJKrJNWtfwwSQN6vw96la53U");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Create a summary of user's choices with skill context
            const choicesSummary = questions.map(q => ({
                skill: q.skill,
                question: q.question,
                selectedChoice: q.choices[selectedAnswers[q.id]]
            }));

            const predictionPrompt = `As a career advisor for the current user, analyze these skill-based choices and predict the potential career trajectory. Here are the developer's choices for different skills:
            ${JSON.stringify(choicesSummary, null, 2)}
            
            Please provide:
            1. Analysis of their skill development approach
            2. Potential career trajectory over the next 1-2 years
            3. Key areas of expertise they might develop
            4. Potential challenges and opportunities based on their chosen path
            5. Specific recommendations for succeeding with these skill choices
            6. Possible job roles or positions they might be well-suited for
            
            Keep the response concise but insightful, focusing on the specific skills they're developing.`;

            const result = await model.generateContent(predictionPrompt);
            setPrediction(result.response.text());
        } catch (error) {
            console.error("Error getting prediction:", error);
            setError("Failed to generate prediction. Please try again.");
        } finally {
            setPredictLoading(false);
        }
    };

    const allQuestionsAnswered = questions.length > 0 &&
        Object.keys(selectedAnswers).length === questions.length;

    return (
        <div className="container">
            <div className="game-container">
                <div className="game-content">
                    <h1 className="game-title">Game of Choices</h1>

                    <div className="skills-list">
                        <h3>Skills Covered:</h3>
                        <div className="skills-tags">
                            {skills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={getResponse}
                        disabled={loading}
                        className="generate-button"
                    >
                        {loading ? 'Generating Questions...' : 'Generate Skills Assessment'}
                    </button>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="questions-container">
                        {questions.map((question) => (
                            <div key={question.id} className="question-card">
                                <div className="question-header">
                                    <span className="skill-label">{question.skill}</span>
                                    <h3 className="question-text">{question.question}</h3>
                                </div>
                                <div className="choices-container">
                                    {question.choices.map((choice, index) => (
                                        <button
                                            key={index}
                                            className={`choice-button ${selectedAnswers[question.id] === index ? 'selected' : ''}`}
                                            onClick={() => handleChoiceSelect(question.id, index)}
                                        >
                                            {choice}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {allQuestionsAnswered && (
                        <div className="prediction-section">
                            <button
                                onClick={getPrediction}
                                disabled={predictLoading}
                                className="predict-button"
                            >
                                {predictLoading ? 'Analyzing Choices...' : 'Get Career Prediction'}
                            </button>

                            {prediction && (
                                <div className="prediction-card">
                                    <h3>Your Career Prediction</h3>
                                    <div className="prediction-content">
                                        <ReactMarkdown>{prediction}</ReactMarkdown>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChoicesGame;