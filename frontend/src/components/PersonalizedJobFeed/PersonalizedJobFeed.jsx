import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { Clock, Briefcase, MapPin, Tag } from 'lucide-react';

const PersonalizedJobFeed = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userProfile, setUserProfile] = useState({
        skills: [],
        domainOfInterest: ''
    });

    useEffect(() => {
        const fetchPersonalizedJobs = async () => {
            try {
                const data = await fetchWithAuth('http://127.0.0.1:8000/api/personalized-job-feed/');

                console.log('Full API Response:', data);

                // Set jobs and user profile information
                setJobs(data.personalized_jobs || []);
                setUserProfile({
                    skills: data.user_skills || [],
                    domainOfInterest: data.domain_of_interest || ''
                });

                setLoading(false);
            } catch (error) {
                console.error('Complete Error Details:', {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                });
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPersonalizedJobs();
    }, []);

    if (loading) {
        return (
            <div className="p-4 text-center text-gray-600">
                Loading personalized jobs...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Personalized Job Recommendations
                </h2>
                {userProfile.skills.length > 0 && (
                    <div className="mt-2">
                        <p className="text-gray-600">
                            Based on your skills: 
                            <span className="ml-2 font-semibold">
                                {userProfile.skills.join(', ')}
                            </span>
                        </p>
                        {userProfile.domainOfInterest && (
                            <p className="text-gray-600">
                                Domain of Interest: 
                                <span className="ml-2 font-semibold">
                                    {userProfile.domainOfInterest}
                                </span>
                            </p>
                        )}
                    </div>
                )}
            </div>
            
            {jobs.length === 0 ? (
                <div className="text-center text-gray-500">
                    No personalized jobs found. Try updating your profile.
                </div>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job, index) => (
                        <div 
                            key={job.job_id || index} 
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {job.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {job.company_name}
                                    </p>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">
                                    {job.job_type}
                                </span>
                            </div>

                            <div className="flex items-center text-gray-600 space-x-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    <MapPin size={16} className="text-gray-500" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock size={16} className="text-gray-500" />
                                    <span>{job.days_ago} days ago</span>
                                </div>
                                {job.salary && (
                                    <div className="flex items-center space-x-1">
                                        <Briefcase size={16} className="text-gray-500" />
                                        <span>${job.salary}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-700 mb-4 line-clamp-2">
                                {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {job.skills_list && job.skills_list.map(skill => (
                                    <span 
                                        key={skill} 
                                        className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded flex items-center"
                                    >
                                        <Tag size={12} className="mr-1 text-gray-500" />
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <button 
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                View Job Details
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalizedJobFeed;