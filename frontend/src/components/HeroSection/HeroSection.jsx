import React from 'react'
import "./HeroSection.css"
const HeroSection = () => {
    return (
        <div className='hero-section'>
            <div className="hero-header">
                <div className="info-box">
                    <h2>Find a job that suits your interest & skills.</h2>
                    <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>
                    <div className="search-box">
                        <div className="box1">
                            <img src="../images/search.png" alt="" />
                            <input type="text" placeholder='Job title, Keyword' />
                        </div>
                        <div className="box2">
                            <img src="../images/location.png" alt="" />
                            <input type="text" placeholder='Your location' />
                        </div>
                        <div className="box3">
                            <button>Find Job</button>
                        </div>
                    </div>
                    <span>Suggestion: Designer, Programing, Digital Marketing, Video, Animation.</span>
                </div>
                <div className="img-box">
                    <img src="../images/hero-vector.png" alt="" />
                </div>
            </div>

            <div className="hero-footer">
                <div className="box">
                    <div className="img-box">
                        <img src="../images/briefcase.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>1,75,324</p>
                        <span>Live Jobs</span>
                    </div>
                </div>
                <div className="box">
                    <div className="img-box" style={{ background: "#0a65cc" }}>
                        <img src="../images/company.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>97,354</p>
                        <span>Companies</span>
                    </div>
                </div>
                <div className="box">
                    <div className="img-box">
                        <img src="../images/candidates.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>38,47,145</p>
                        <span>Candidates</span>
                    </div>
                </div>
                <div className="box">
                    <div className="img-box">
                        <img src="../images/briefcase.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>7,523</p>
                        <span>New Jobs</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
