import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./SkillsVerificationPage.css";
import { quizData } from '../../../quiz/quiz';
import axios from "axios"

const SkillsVerificationPage = () => {
    const { skillName } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [videos, setVideos] = useState([]);
    const API_KEY = "AIzaSyCT_jXkbZ_g8gjg46Tn2D0stmOhjBtHeQo";
    const limit = 5;
    useEffect(() => {
        setQuestions(Array(quizData[`${skillName}`])[0]);
    }, [skillName]);

    useEffect(() => {
        if (showModal) {
            const fetchVideos = async () => {
                try {
                    const response = await axios.get(
                        `https://www.googleapis.com/youtube/v3/search`,
                        {
                            params: {
                                key: API_KEY,
                                part: 'snippet',
                                type: 'video',
                                q: skillName,
                                maxResults: limit,
                            },
                        }
                    );
                    setVideos(response.data.items);
                    console.log(videos)
                } catch (error) {
                    console.error('Error fetching YouTube videos:', error);
                }
            };

            fetchVideos();
        }
    }, [showModal, skillName]);

    const handleAnswerSelect = (answer) => {
        if (!isAnswerChecked) {
            setSelectedAnswer(answer);
        }
    };

    const handleAnswerSubmit = () => {
        if (!isAnswerChecked) {
            setIsAnswerChecked(true);
            if (selectedAnswer === questions[currentQuestion].correctAnswer) {
                setScore(prev => prev + 1);
            }
        } else {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer('');
                setIsAnswerChecked(false);
            } else {
                const percentage = (score / questions.length) * 100;
                setShowResults(true);
                // if (percentage < 80) {
                //     setShowModal(false);
                // }
                updateScoreInBackend();
            }
        }
    };

    const getOptionStyle = (option) => {
        if (!isAnswerChecked || selectedAnswer !== option) return '';

        const isCorrect = option === questions[currentQuestion].correctAnswer;
        return isCorrect ? 'correct-answer' : 'wrong-answer';
    };

    const updateScoreInBackend = async () => {
        try {
            setIsUpdating(true);
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No JWT token found!');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/update-skill-score/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skills: [
                        {
                            name: skillName,
                            score: score,
                            verified: score >= 80, // Example: mark as verified if score >= 80
                        },
                    ],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Score updated successfully:', data);
            } else {
                const errorData = await response.json();
                console.error('Error updating score:', errorData.detail);
            }
        } catch (error) {
            console.error('Error updating score:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleReturnToDashboard = async () => {
        try {
            setIsUpdating(true);
            await updateScoreInBackend();
            navigate('/dashboard'); // Redirect to dashboard after updating
        } catch (error) {
            console.error('Error returning to dashboard:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    if (!questions.length) {
        return <div className="quiz-container">Loading quiz...</div>;
    }

    if (showResults) {
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= 80;

        return (
            <div className="quiz-container">
                <div className="results-card">
                    <h2>Quiz Results</h2>
                    <div className={`results-alert ${passed ? 'success' : 'failure'}`}>
                        <p>You scored {score} out of {questions.length} ({percentage.toFixed(1)}%)</p>
                        <p>
                            {passed
                                ? "Congratulations! You've passed the skill verification."
                                : "You might need more practice with this skill."}
                        </p>
                    </div>
                    <div className='btns-box'>

                        <button
                            className="return-button"
                            onClick={handleReturnToDashboard}
                            disabled={isUpdating}
                        >
                            Return to Dashboard
                        </button>

                        <button
                            className="return-button"
                            onClick={() => setShowModal(true)}
                        >
                            How to UpSkill?
                        </button>

                    </div>
                </div>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close-btn" onClick={closeModal}>
                                &times;
                            </button>
                            <h2>Recommended Videos for {skillName}</h2>
                            {videos.length > 0 ? (
                                <div className="video-list">
                                    {videos.map((video, index) => (
                                        <div
                                            className="video-item"
                                            key={video.id.videoId}
                                        >
                                            <a
                                                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="video-link"
                                            >
                                                <img
                                                    src={video.snippet.thumbnails.medium.url}
                                                    alt={video.snippet.title}
                                                    className="video-thumbnail"
                                                />
                                                <p className="video-title">{video.snippet.title}</p>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Loading recommended videos...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="quiz-container">
            <div className="quiz-card">
                <div className="quiz-header">
                    <span className="quiz-progress">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="quiz-score">
                        Score: {score}
                    </span>
                </div>

                <h2 className="question-text">{currentQ.question}</h2>

                <div className="options-container">
                    {currentQ.options.map((option, index) => (
                        <div
                            key={index}
                            className={`option-item ${getOptionStyle(option)}`}
                            onClick={() => handleAnswerSelect(option)}
                        >
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="quiz-option"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => handleAnswerSelect(option)}
                                disabled={isAnswerChecked}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                </div>

                <button
                    className="submit-button"
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer && !isAnswerChecked}
                >
                    {isAnswerChecked
                        ? (currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question')
                        : 'Check Answer'
                    }
                </button>
            </div>
        </div>
    );
};

export default SkillsVerificationPage;
