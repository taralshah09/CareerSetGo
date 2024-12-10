import React from 'react'
import "./PricesAndBilling.css"

const PricesAndBilling = () => {
    return (
        <div className='prices-container'>
            <div className="prices-container-top">
                <div className="left">
                    <h2>
                        Buy Premium Subscription to Post a Job
                    </h2>
                    <p>
                        Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada quis justo sit amet, varius tempus neque. Quisque ultrices mi sed lorem condimentum, vel tempus lectus ultricies.
                    </p>
                </div>
                <div className="right">
                    <img src="../images/pricing-vector.png" alt="" />
                </div>
            </div>
            <div className="prices-container-bottom">
                <div id="basic" className="plans">
                    <div className="top">
                        <h3>Basic</h3>
                        <p>Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.</p>

                        <h2>$19<span>/month</span></h2>
                    </div>

                    <ul>
                        <li>Post 1 Job</li>
                        <li>Urgents & Featured Jobs</li>
                        <li>Highlights Job with Colors</li>
                        <li>Access & Saved 5 Candidates </li>
                        <li>10 Days Resume Visibility</li>
                        <li>24/7 Critical Support</li>
                    </ul>

                    <button className='get-plan-btn'>Choose Plan <img src="../images/arrow-right.png" alt="" /></button>
                </div>

                <div id="regular" className="plans">
                    <div className="top">
                        <h3>Regular</h3>
                        <p>Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.</p>

                        <h2>$39<span>/month</span></h2>
                    </div>

                    <ul>
                        <li>3 Active Jobs</li>
                        <li>Urgents & Featured Jobs</li>
                        <li>Highlights Job with Colors</li>
                        <li>Access & Saved 10 Candidates </li>
                        <li>20 Days Resume Visibility</li>
                        <li>24/7 Critical Support</li>
                    </ul>

                    <button className='get-plan-btn'>Choose Plan <img src="../images/white-tick.png" alt="" /></button>
                </div>
                <div id="premium" className="plans">
                    <div className="top">
                        <h3>Premium</h3>
                        <p>Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.</p>

                        <h2>$59<span>/month</span></h2>
                    </div>

                    <ul>
                        <li>6 Active Jobs</li>
                        <li>Urgents & Featured Jobs</li>
                        <li>Highlights Job with Colors</li>
                        <li>Access & Saved 20 Candidates </li>
                        <li>30 Days Resume Visibility</li>
                        <li>24/7 Critical Support</li>
                    </ul>

                    <button className='get-plan-btn'>Choose Plan <img src="../images/arrow-right.png" alt="" /></button>
                </div>
            </div>

        </div>
    )
}

export default PricesAndBilling
