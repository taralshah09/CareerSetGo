import React, { useState } from 'react';
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
        facebookLink: '',
        linkedinLink: '',
        twitterLink: '',
        instagramLink: '',
        professionalSkills: [],
        domainOfInterest: [],
        certifications: [''],
    });

    const [skillName, setSkillName] = useState("");
    const [domainSearch, setDomainSearch] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, resume: e.target.files[0] }));
    };

    const addCertification = () => {
        setFormData((prevData) => ({ ...prevData, certifications: [...prevData.certifications, ''] }));
    };

    const handleCertificationChange = (index, value) => {
        const updatedCertifications = [...formData.certifications];
        updatedCertifications[index] = value;
        setFormData((prevData) => ({ ...prevData, certifications: updatedCertifications }));
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
            !formData.professionalSkills.includes(skill)  // Exclude already selected skills
    );

    const filteredDomains = domainOptions.filter(
        domain =>
            domain.toLowerCase().includes(domainSearch.toLowerCase()) &&
            !formData.domainOfInterest.includes(domain)  // Exclude already selected domains
    );

    const addSkills = (e, skill) => {
        e.preventDefault();
        if (!formData.professionalSkills.includes(skill)) {
            setFormData((prev) => ({
                ...prev,
                professionalSkills: [...prev.professionalSkills, skill]
            }));
        }
        setSkillName("");
    };

    const addDomain = (e, domain) => {
        e.preventDefault();
        if (!formData.domainOfInterest.includes(domain)) {
            setFormData((prev) => ({
                ...prev,
                domainOfInterest: [...prev.domainOfInterest, domain]
            }));
        }
        setDomainSearch("");
    };

    return (
        <form className="profile-form">
            {/* Professional Skills */}
            <label className="form-label">Professional Skills</label>
            <div className="input-group">
                {formData.professionalSkills.length > 0 && (
                    <div className="selected-items">
                        {formData.professionalSkills.map((skill, index) => (
                            <span key={index} className="item-badge">{skill}</span>
                        ))}
                    </div>
                )}
                <input
                    type="text"
                    value={skillName}
                    onChange={e => setSkillName(e.target.value)}
                    placeholder="Search for a skill..."
                    className="search-input"
                />
            </div>
            {skillName && (
                <ul className="options-list">
                    {filteredSkills.map((skill, index) => (
                        <li
                            key={index}
                            className="option-item"
                            onClick={(e) => {
                                addSkills(e, skill);
                                setSkillName(skill);
                            }}
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            )}

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
                <input
                    type="text"
                    value={domainSearch}
                    onChange={e => setDomainSearch(e.target.value)}
                    placeholder="Search for a domain..."
                    className="search-input"
                />
            </div>
            {domainSearch && (
                <ul className="options-list">
                    {filteredDomains.map((domain, index) => (
                        <li
                            key={index}
                            className="option-item"
                            onClick={(e) => {
                                addDomain(e, domain);
                                setDomainSearch(domain);
                            }}
                        >
                            {domain}
                        </li>
                    ))}
                </ul>
            )}

            {/* Other fields remain the same */}
            <label className="form-label">Languages</label>
            <select name="languages" value={formData.languages} onChange={handleInputChange} className="form-select">
                <option value="">Select a language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="Mandarin">Mandarin</option>
            </select>

            <label className="form-label">Availability Status</label>
            <select name="availabilityStatus" value={formData.availabilityStatus} onChange={handleInputChange} className="form-select">
                <option value="">Select availability</option>
                <option value="Actively looking for opportunities">Actively looking for opportunities</option>
                <option value="Open to opportunities">Open to opportunities</option>
                <option value="Not looking for opportunities">Not looking for opportunities</option>
            </select>

            <label className="form-label">Preferred Work Environment</label>
            <select name="workEnvironment" value={formData.workEnvironment} onChange={handleInputChange} className="form-select">
                <option value="">Select work environment</option>
                <option value="Remote">Remote</option>
                <option value="In-Office">In-Office</option>
                <option value="Hybrid">Hybrid</option>
            </select>

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
                    <button type="button" onClick={addCertification} className="add-certification-btn">
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
