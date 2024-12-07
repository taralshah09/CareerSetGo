import React from 'react';
import { Box, Typography, CircularProgress, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
const SkillGapAnalysis = ({ skillGapResult, setSkillGapResult }) => {
    if (!skillGapResult) return null;
    const missingSkills = skillGapResult?.missing_skills;
    console.log("Missing skills : ", skillGapResult?.missing_skills)

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    p: 4,
                    background: 'linear-gradient(135deg, #ffffff, #f4f4f9)',
                    borderRadius: 4,
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                    maxWidth: '500px',
                    width: '90%',
                    position: 'relative',
                }}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#333' }}>
                        Skill Gap Analysis
                    </Typography>
                    <button
                        onClick={() => setSkillGapResult(null)}
                        style={{
                            backgroundColor: '#ff0000',
                            padding: '10px 10px',
                            border: 0,
                            outline: 0,
                            borderRadius: '5px',
                            cursor: 'pointer',
                            opacity: 1, // Initial opacity
                            transition: 'opacity 0.3s, background-color 0.3s', // Smooth transition
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.opacity = 0.6; // Reduce opacity on hover
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.opacity = 1; // Restore opacity
                        }}
                    >
                        <i className="fa-solid fa-xmark" style={{ color: 'white' }}></i>
                    </button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Content Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    {/* Left Side: Skills */}
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: '#444' }}>
                            Matched Skills
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                color: '#666',
                                fontStyle: skillGapResult.matching_skills.length ? 'normal' : 'italic',
                            }}
                        >
                            {skillGapResult.matching_skills.length
                                ? skillGapResult.matching_skills.join(', ')
                                : 'None'}
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: '#444' }}>
                            Missing Skills
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                                fontStyle: skillGapResult.missing_skills.length ? 'normal' : 'italic',
                            }}
                        >
                            {skillGapResult.missing_skills.length
                                ? skillGapResult.missing_skills.join(', ')
                                : 'None'}
                        </Typography>
                    </Box>

                    {/* Right Side: Circular Progress */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            ml: 3,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'inline-flex',
                                mb: 1,
                            }}
                        >
                            <CircularProgress
                                variant="determinate"
                                value={skillGapResult.skill_completeness}
                                size={100}
                                thickness={4}
                                color="primary"
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ color: '#333' }}
                                >
                                    {skillGapResult.skill_completeness}%
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{ color: '#777' }}
                        >
                            Skill completeness
                        </Typography>
                    </Box>
                </Box>

                {/* Footer Section */}
                <Divider sx={{ mt: 3, mb: 2 }} />
                <Box sx={{ textAlign: 'left' }}>
                    <Link to="/course"
                        style={{ textDecoration: "none", color: "#2563eb" }}
                        state={{ skillGapResult }}
                    >
                        Browse Courses
                    </Link>
                </Box>
                <Box sx={{ textAlign: 'left', marginTop: "10px" }}>
                    <Link to="/roadmap"
                        style={{ textDecoration: "none", color: "#2563eb" }}
                        state={{ skillGapResult }}
                    >
                        Roadmap
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SkillGapAnalysis;
