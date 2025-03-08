import React, { useState, useEffect } from 'react';
import './OtherFields.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axios';
const OtherFields = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        headline: '',
        experience: '',
        education: '',
        personalWebsite: '',
        resume: null,
        nationality: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        biography: '',
        skills: [],
        domainOfInterest: [],
        certifications: [''],
        preferredWorkEnvironment: '',
        availabilityStatus: '',
        languages: '',
        location: ''
    });

    const [profileData, setProfileData] = useState(null);
    const [skillName, setSkillName] = useState("");
    const [domainSearch, setDomainSearch] = useState("");

    // Fetch existing profile data when component mounts
    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await api.get('/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('Raw response:', response.data);  // Log raw data
                setProfileData(response.data);
                setFormData(prev => ({
                    ...prev,
                    fullName: response.data.fullname || '',
                    headline: response.data.title || '',
                    experience: response.data.experience || '',
                    education: response.data.education || '',
                    personal_website: response.data.personal_website || '',
                    nationality: response.data.nationality || '',
                    date_of_birth: response.data.date_of_birth || '',
                    gender: response.data.gender || '',
                    marital_status: response.data.marital_status || '',
                    biography: response.data.biography || '',
                    skills: Array.isArray(response.data.skills)
                        ? response.data.skills
                        : typeof response.data.skills === 'string'
                            ? JSON.parse(response.data.skills)
                            : [],
                    domain_of_interest: response.data.domain_of_interest ? response.data.domain_of_interest.split(',') : [],
                    certifications: response.data.certifications ? response.data.certifications.split(',') : [''],
                    preferred_work_environment: response.data.preferred_work_environment || '',
                    availability_status: response.data.availability_status || '',
                    languages: response.data.languages || '',
                    location: response.data.location || ''
                }));
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data || error.message);
            }
        };
        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            resume: e.target.files[0]
        }));
    };

    const addCertification = () => {
        setFormData(prev => ({
            ...prev,
            certifications: [...prev.certifications, '']
        }));
    };

    const handleCertificationChange = (index, value) => {
        const updatedCertifications = [...formData.certifications];
        updatedCertifications[index] = value;
        setFormData(prev => ({
            ...prev,
            certifications: updatedCertifications
        }));
    };

    const skillOptions = ["HTML", "CSS", "Javascript", "Python", "React", "Node.js", "C++", "Java", "SQL", "Machine Learning", "Data Structures", "Algorithms"];
    const domainOptions = [
        "Software Development", "Data Science", "Cybersecurity", "AI/ML", "Computer Networking",
        "Database Management", "Finance", "Investment Banking", "Financial Analysis",
        "Management Consulting", "Project Management"
    ];

    const filteredSkills = skillOptions.filter(
        skill =>
            skill.toLowerCase().includes(skillName.toLowerCase()) &&
            !formData.skills.some(s => s.name === skill)
    );

    const filteredDomains = domainOptions.filter(
        domain =>
            domain.toLowerCase().includes(domainSearch.toLowerCase()) &&
            !formData.domainOfInterest.includes(domain)
    );

    const addSkills = (e, skill) => {
        if (!skill) return;
        e.preventDefault();

        if (!formData.skills.some(s => s.name === skill)) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, {
                    name: skill,
                    score: 0,
                    verified: false
                }]
            }));
        }
        setSkillName("");
    };

    const addDomain = (e, domain) => {
        if (!domain) return;
        e.preventDefault();

        if (!formData.domainOfInterest.includes(domain)) {
            setFormData(prev => ({
                ...prev,
                domainOfInterest: [...prev.domainOfInterest, domain]
            }));
        }
        setDomainSearch("");
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkills(e, skillName.trim());
        }
    };

    const handleDomainKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addDomain(e, domainSearch.trim());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('access_token');
    
        const formatDate = (dateString) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        };
    
        const formattedSkills = formData.skills.map(skill => {
            if (typeof skill === 'string') {
                return { name: skill, score: 0, verified: false };
            }
            return {
                name: skill.name || skill,
                score: skill.score || 0,
                verified: skill.verified || false
            };
        });
    
        const dataToSend = {
            fullname: formData.fullName,
            title: formData.headline,
            experience: formData.experience,
            education: formData.education,
            personal_website: formData.personalWebsite,
            nationality: formData.nationality,
            date_of_birth: formatDate(formData.dateOfBirth),
            gender: formData.gender,
            marital_status: formData.maritalStatus,
            biography: formData.biography,
            skills: formattedSkills,
            domain_of_interest: formData.domainOfInterest.join(','),
            certifications: formData.certifications.join(','),
            preferred_work_environment: formData.preferredWorkEnvironment,
            availability_status: formData.availabilityStatus,
            languages: formData.languages,
            location: formData.location
        };
    
        const formDataToSend = new FormData();
        Object.keys(dataToSend).forEach(key => {
            if (key === 'skills') {
                formDataToSend.append(key, JSON.stringify(dataToSend[key]));
            } else if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
                formDataToSend.append(key, dataToSend[key]);
            }
        });
    
        if (formData.resume) {
            formDataToSend.append('resume', formData.resume);
        }
    
        try {
            const response = await api.patch('/api/user/profile/', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // No need for 'Content-Type': FormData sets it automatically
                },
            });
    
            console.log('Profile updated successfully:', response.data);
            toast.success('Profile updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                style: { backgroundColor: '#4CAF50', color: 'white' }
            });
        } catch (error) {
            console.error('Error submitting profile:', error.response?.data || error.message);
            toast.error('Failed to update profile. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light"
            });
        }
    };

    const handleRemoveSkill = (index) => {
        // Create a new array excluding the skill at the given index
        const updatedSkills = formData.skills.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            skills: updatedSkills
        });

    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <form className="profile-form" onSubmit={handleSubmit}>
                {/* Professional Skills */}
                <label className="form-label">Professional Skills</label>
                <div className="input-group">
                    <div className="input-skills">
                        {formData?.skills?.map((skill, index) => (
                            <div className="item-badge" key={index}>
                                <p>{skill?.name?.length > 10 ? skill?.name.substr(0, 10) + "..." : skill?.name}</p>
                                <span onClick={() => handleRemoveSkill(index)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='skill-input-box'>
                        <input
                            type="text"
                            value={skillName}
                            onChange={e => setSkillName(e.target.value)}
                            placeholder="Search for a skill..."
                            className="search-input"
                            onKeyDown={handleSkillKeyDown}
                        />
                        <button className='add-button' onClick={(e) => {
                            addSkills(e, skillName);
                        }}>Add</button>
                    </div>
                </div>

                {/* Domain of Interest */}
                <label className="form-label">Domain of Interest</label>
                <div className="input-group">
                    {formData.domainOfInterest.length > 0 && (
                        <div className="selected-items">
                            {formData.domainOfInterest.map((domain, index) => (
                                <span key={index} className="item-badge">{domain}</span>
                            ))}
                        </div>
                    )}
                    <div className='skill-input-box'>
                        <input
                            type="text"
                            value={domainSearch}
                            onChange={e => setDomainSearch(e.target.value)}
                            placeholder="Search for a domain..."
                            className="search-input"
                            onKeyDown={handleDomainKeyDown}
                        />
                        <button className='add-button' onClick={(e) => {
                            addDomain(e, domainSearch);
                        }}>Add</button>
                    </div>
                </div>

                {/* Languages */}
                <label className="form-label">Languages</label>
                <select
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="form-select"
                >
                    <option value="">Select a language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Mandarin">Mandarin</option>
                </select>

                {/* Availability Status */}
                <label className="form-label">Availability Status</label>
                <select
                    name="availabilityStatus"
                    value={formData.availabilityStatus}
                    onChange={handleInputChange}
                    className="form-select"
                >
                    <option value="">Select availability</option>
                    <option value="Actively looking for opportunities">Actively looking for opportunities</option>
                    <option value="Open to opportunities">Open to opportunities</option>
                    <option value="Not looking for opportunities">Not looking for opportunities</option>
                </select>

                {/* Preferred Work Environment */}
                <label className="form-label">Preferred Work Environment</label>
                <select
                    name="preferredWorkEnvironment"
                    value={formData.preferredWorkEnvironment}
                    onChange={handleInputChange}
                    className="form-select"
                >
                    <option value="">Select work environment</option>
                    <option value="Remote">Remote</option>
                    <option value="In-Office">In-Office</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                {/* Certifications */}
                <label className="form-label">Certifications</label>
                {formData.certifications.map((cert, index) => (
                    <div key={index} className="certification-field">
                        <input
                            type="text"
                            value={cert}
                            onChange={(e) => handleCertificationChange(index, e.target.value)}
                            placeholder="Enter certification"
                            className="form-input"
                        />
                        <button
                            type="button"
                            onClick={addCertification}
                            className="add-certification-btn"
                        >
                            Add Certification
                        </button>
                    </div>
                ))}

                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </>

    );
};

export default OtherFields;