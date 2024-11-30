import React, { useState, useEffect } from 'react';
import './OtherFields.css';

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
                const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setFormData(prev => ({
                        ...prev,
                        fullName: data.fullname || '',
                        headline: data.title || '',
                        experience: data.experience || '',
                        education: data.education || '',
                        personalWebsite: data.personal_website || '',
                        nationality: data.nationality || '',
                        dateOfBirth: data.date_of_birth || '',
                        gender: data.gender || '',
                        maritalStatus: data.marital_status || '',
                        biography: data.biography || '',
                        skills: Array.isArray(data.skills) ? data.skills : [],
                        domainOfInterest: data.domain_of_interest ? data.domain_of_interest.split(',') : [],
                        certifications: data.certifications ? data.certifications.split(',') : [''],
                        preferredWorkEnvironment: data.preferred_work_environment || '',
                        availabilityStatus: data.availability_status || '',
                        languages: data.languages || '',
                        location: data.location || ''
                    }));
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem('access_token');

    //     // Ensure skills are in the correct format for DRF serializer
    //     const formattedSkills = formData.skills.map(skill => ({
    //         name: skill.name,
    //         score: skill.score || 0,
    //         verified: skill.verified || false
    //     }));

    //     // Create an object that matches the Django serializer's expected structure
    //     const dataToSend = {
    //         fullname: formData.fullName,
    //         title: formData.headline,
    //         experience: formData.experience,
    //         education: formData.education,
    //         personal_website: formData.personalWebsite,
    //         nationality: formData.nationality,
    //         date_of_birth: formData.dateOfBirth,
    //         gender: formData.gender,
    //         marital_status: formData.maritalStatus,
    //         biography: formData.biography,
    //         skills: formattedSkills,
    //         domain_of_interest: formData.domainOfInterest.join(','),
    //         certifications: formData.certifications.join(','),
    //         preferred_work_environment: formData.preferredWorkEnvironment,
    //         availability_status: formData.availabilityStatus,
    //         languages: formData.languages,
    //         location: formData.location
    //     };

    //     // Create FormData for file uploads
    //     const formDataToSend = new FormData();

    //     // Append all non-file fields
    //     Object.keys(dataToSend).forEach(key => {
    //         if (key === 'skills') {
    //             // Stringify skills to send as JSON
    //             formDataToSend.append(key, JSON.stringify(dataToSend[key]));
    //         } else if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
    //             formDataToSend.append(key, dataToSend[key]);
    //         }
    //     });

    //     // Append files if they exist
    //     if (formData.resume) {
    //         formDataToSend.append('resume', formData.resume);
    //     }

    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
    //             method: 'PATCH',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //             body: formDataToSend,
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Profile updated successfully:', data);
    //             // Add success notification here
    //         } else {
    //             const errorData = await response.text();
    //             console.error('Error updating profile:', errorData);
    //             // Add error handling logic
    //         }
    //     } catch (error) {
    //         console.error('Error submitting profile:', error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('access_token');
    
        // Format date to YYYY-MM-DD if it exists
        const formatDate = (dateString) => {
            if (!dateString) return null;
            const date = new Date(dateString);
            return date.toISOString().split('T')[0]; // This will format to YYYY-MM-DD
        };
    
        // Ensure skills are in the correct format for DRF serializer
        const formattedSkills = formData.skills.map(skill => ({
            name: skill.name,
            score: skill.score || 0,
            verified: skill.verified || false
        }));
    
        // Create an object that matches the Django serializer's expected structure
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
            skills: formData.skills,  // Send as list of dictionaries
            domain_of_interest: formData.domainOfInterest.join(','),
            certifications: formData.certifications.join(','),
            preferred_work_environment: formData.preferredWorkEnvironment,
            availability_status: formData.availabilityStatus,
            languages: formData.languages,
            location: formData.location
        };
    
        // Create FormData for file uploads
        const formDataToSend = new FormData();
    
        // Append all non-file fields
        Object.keys(dataToSend).forEach(key => {
            if (key === 'skills') {
                // Directly append the skills array
                formDataToSend.append(key, JSON.stringify(dataToSend[key]));
            } else if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
                formDataToSend.append(key, dataToSend[key]);
            }
        });
    
    
        // Append files if they exist
        if (formData.resume) {
            formDataToSend.append('resume', formData.resume);
        }
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend,
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Profile updated successfully:', data);
                // Add success notification here
            } else {
                const errorData = await response.json();
                console.error('Error updating profile:', errorData);
                // Add detailed error handling
                Object.keys(errorData).forEach(key => {
                    console.error(`${key}:`, errorData[key]);
                });
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
    };
    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            {/* Professional Skills */}
            <label className="form-label">Professional Skills</label>
            <div className="input-group">
                {formData.skills.length > 0 && (
                    <div className="selected-items">
                        {formData.skills.map((skill, index) => (
                            <span key={index} className="item-badge">{skill.name}</span>
                        ))}
                    </div>
                )}
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
    );
};

export default OtherFields;