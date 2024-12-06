import React from 'react'

const Dummy = () => {
  return (
    <div className="personal">
            <div className="basic-info">
                
                <form className="basic-info-content" onSubmit={handleSubmit}>
                    
                    <div className="basic-info-content-right">
                        <div className="top">
                            <div className="top-left">
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    value={profileData.fullname || ''}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="top-right">
                                <label htmlFor="title">Title/Headline</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={profileData.title || ''}
                                    onChange={handleChange}
                                    placeholder="Title/Headline"
                                />
                            </div>
                        </div>
                        <div className="mid-1">
                            <div className="mid-1-left">
                                <label htmlFor="experience">Experience</label>
                                <select
                                    id="experience"
                                    name="experience"
                                    value={profileData.experience || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Experience</option>
                                    <option value="10">10+ years</option>
                                    <option value="5">5+ years</option>
                                    <option value="3">3+ years</option>
                                    <option value="1">1+ years</option>
                                    <option value="0">No Experience</option>
                                </select>
                            </div>
                            <div className="mid-1-right">
                                <label htmlFor="education">Education</label>
                                <select
                                    id="education"
                                    name="education"
                                    value={profileData.education || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Education</option>
                                    <option value="Masters">Masters</option>
                                    <option value="Bachelors">Bachelors</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="HSC">H.S.C.</option>
                                    <option value="SSC">S.S.C</option>
                                    <option value="School Dropout">School Dropout</option>
                                </select>
                            </div>
                        </div>
                        <div className="mid-2">
                            <label htmlFor="personal_website">Personal Website</label>
                            <input
                                type="text"
                                id="personal_website"
                                name="personal_website"
                                placeholder="Personal Website URL"
                                value={profileData.personal_website || ''}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <div className="bottom">
                            <div>
                                <label htmlFor="resume">Resume</label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleChange}
                                    accept=".pdf"
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                        </div> */}
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Dummy
