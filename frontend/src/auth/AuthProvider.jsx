import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);

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
                    setUser(data); // Set the user data globally
                    setSkills(Array.isArray(data.skills)
                        ? data.skills
                        : typeof data.skills === 'string'
                            ? JSON.parse(data.skills)
                            : []);
                    console.log(data.user_id)
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, skills }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the context
const useAuth = () => {

    return useContext(UserContext);
};

export { AuthProvider, useAuth };
