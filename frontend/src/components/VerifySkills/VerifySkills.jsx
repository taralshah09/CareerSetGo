import React, { useEffect, useState } from 'react'

const VerifySkills = () => {
    const [skills, setSkills] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>

        </div>
    )
}

export default VerifySkills
