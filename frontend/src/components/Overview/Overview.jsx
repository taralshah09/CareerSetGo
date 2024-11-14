import React from 'react';
import "./Overview.css";

const Overview = () => {
    return (
        <div className='overview'>
            <div className="overview-header">
                <h2>Hello, Esther Howard</h2>
                <p>Here is your daily activities and job alerts</p>
            </div>

            <div className="overview-stats">
                <div className="stats-item">
                    <div className="stats-left">

                        <h3>589</h3>
                        <p>Applied jobs</p>
                    </div>
                    <div className="img-box">
                        <img src="../images/bag.png" alt="" />
                    </div>
                </div>
                <div className="stats-item">
                    <div className="stats-left">

                        <h3>238</h3>
                        <p>Favorite jobs</p>
                    </div>
                    <div className="img-box">
                        <img src="../images/save.png" alt="" />
                    </div>
                </div><div className="stats-item">
                    <div className="stats-left">

                        <h3>574</h3>
                        <p>Job Alerts</p>
                    </div>
                    <div className="img-box">
                        <img src="../images/alert.png" alt="" />
                    </div>
                </div>
            </div>

            <div className="profile-completion">
                <div className='profile-completion-left'>
                    <img src="../images/user.png" alt="" />

                    <div>
                        <h4>Your profile editing is not completed.</h4>
                        <p>Complete your profile editing & build your custom Resume</p>

                    </div>
                </div>
                <button>Edit Profile</button>
            </div>

            <div className="recently-applied">
                <h3>Recently Applied</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Job</th>
                            <th>Date Applied</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="job-details">
                                    <img src="../images/c1.png" alt="Upwork Logo" className="company-logo" />
                                    <div>
                                        <span className="job-title">Networking Engineer<span className="badge">Remote</span><br /></span>

                                        <span>Washington</span>
                                    </div>
                                </div>
                            </td>
                            <td>Feb 2, 2019 19:28</td>
                            <td><span className="status-active">Active</span></td>
                            <td><button className="action-btn">View Details</button></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="job-details">
                                    <img src=" ../images/c2.png" alt="Dribbble Logo" className="company-logo" />
                                    <div>
                                        <span className="job-title">Product Designer <span className="badge">Full Time</span><br /></span>

                                        <span>New Jersey</span>
                                    </div>
                                </div>
                            </td>
                            <td>Dec 7, 2019 23:26</td>
                            <td><span className="status-active">Active</span></td>
                            <td><button className="action-btn">View Details</button></td>
                        </tr>
                        <tr>
                            <td>
                                <div className="job-details">
                                    <img src="../images/c3.png" alt="Apple Logo" className="company-logo" />
                                    <div>
                                        <span className="job-title">Junior Graphic Designer<span className="badge">Temporary</span><br /></span>

                                        <span>San Francisco</span>
                                    </div>
                                </div>
                            </td>
                            <td>Feb 2, 2019 19:28</td>
                            <td><span className="status-active">Active</span></td>
                            <td><button className="action-btn">View Details</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Overview;
