import React from 'react'
import "./PopularCategory.css"

const PopularCategory = () => {
    return (
        <div className="popular-category">
            <div className="popular-category-header">
                <h2>Popular Category</h2>
                <button>View All
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            <div className="popular-category-footer">
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/pen.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Graphics</p>
                        <span>357 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/code.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Programming</p>
                        <span>312 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/marketing.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Digital Marketing</p>
                        <span>297 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/video.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Animation</p>
                        <span>247 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/music.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Music and Audio</p>
                        <span>204 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/finance.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Finance </p>
                        <span>167 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box">
                        <img src="../images/health.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Health and Care</p>
                        <span>125 Open Positions</span>
                    </div>
                </div>
                <div className='box'>
                    <div className="img-box" >
                        <img src="../images/data-science.png" alt="" />
                    </div>
                    <div className="text-box">
                        <p>Data Science</p>
                        <span>57 Open Positions</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularCategory
