import React from 'react'
import "./FindJob.css"
const FindJob = () => {
    return (
        <div className='find-job-container'>
            <div className='find-job-search'>
                <div className="find-job-search-header">
                    <p>Find Job</p>
                </div>
                <div className="input-box">
                    <div className="input-box-1">
                        <img src="../images/search.png" alt="Search Icon" />
                        <input type="text" placeholder='Job title, keyword...' />
                    </div>
                    <div className="input-box-2">
                        <img src="../images/location.png" alt="Location Icon" />
                        <input type="text" placeholder='Location' />
                    </div>
                    <div className="input-box-3">
                        <img src="../images/layers.png" alt="Category Icon" />
                        <select name="category" id="category">
                            <option value="Software Engineer">Software Engineer</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Devops Developer">Devops Developer</option>
                        </select>
                    </div>
                    <div className="input-box-4">
                        <label htmlFor="filter">Advanced Filter</label>
                    </div>
                    <button>Find Job</button>
                </div>
            </div>
            <div className="jobs-container">
                <div className="jobs-filter">
                    <select name="time" id="time">
                        <option value="latest">Latest</option>
                        <option value="old">Old</option>
                    </select>
                    <select name="no_of_jobs" id="no_of_jobs">
                        <option value="12">12</option>
                        <option value="9">9</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="jobs-feed">
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="job">
                        <div className="job-header">
                            <div className="job-header-left">
                                <img src="../images/c1.png" alt="" />
                            </div>
                            <div className="job-header-right">
                                <div className="job-header-right-top">
                                    <p>Company</p>
                                    <span>Featured</span>
                                </div>
                                <div className="job-header-right-bottom">
                                    <img src="images/location.png" alt="" />
                                    <span>United States</span>
                                </div>

                            </div>
                        </div>
                        <div className="job-footer">
                            <p>Marketing Officer</p>
                            <div className="job-footer-bottom">
                                <span>Full Time</span>

                                <span>
                                    30k-35k
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jobs-pagination">
                        
                </div>
            </div>
        </div>

    )
}

export default FindJob
