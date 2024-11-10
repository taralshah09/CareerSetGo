import React from 'react'
import "./FlowChart.css"

const FlowChart = () => {
    return (
        <div className="flow-chart">
            <div className="flow-chart-header">
                <h2>How CareerSetGo works?</h2>
            </div>
            <div className='flow-chart-footer'>
                <div className="flow-chart-img">
                    <img src="../images/csg-flowchart.png" alt="" />
                </div>
                <div className="text-content">
                    <ul>
                        <li>
                            Build Skills & Profile: Start with courses to enhance your skills and create a professional profile.
                        </li>
                        <li>
                            Skill Gap Analysis: Identify areas for improvement and bridge gaps in your expertise.
                        </li>
                        <li>
                            Resume & Job Insights: Use the resume builder and gain insights into industry trends.
                        </li>
                        <li>
                            Mentorship & Community: Connect with mentors and join a community for shared learning.
                        </li>
                        <li>
                            Apply & Secure Jobs: Apply to roles suited to your skills and achieve career success.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FlowChart
