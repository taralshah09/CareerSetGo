import React from 'react'
import "./Users.css"
const Users = () => {
  return (
    <div className="users">
        <div className="candidate-box">
          <h2>Become a Candidate</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugiat quisquam perferendis illum earum iste modi adipisci, facilis, laboriosam aliquam possimus praesentium, amet deserunt ex.</p>
          <button>Register Now <i className="fa-solid fa-arrow-right"></i></button>
        </div>
        <div className="employer-box">
          <h2>Become an Employer</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vitae, amet maiores ab a saepe, iste sit ipsam ut laudantium quaerat in optio voluptates exercitationem!</p>
          <button>Register Now <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
  )
}

export default Users
