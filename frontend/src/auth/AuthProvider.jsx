import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create AuthProvider component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialize user from localStorage if available
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Set user data
                    localStorage.setItem('user', JSON.stringify(data)); // Persist user data
                    setSkills(
                        Array.isArray(data.skills)
                            ? data.skills
                            : typeof data.skills === 'string'
                                ? JSON.parse(data.skills)
                                : []
                    );
                } else if (response.status === 401) {
                    // Handle unauthorized - clear user data
                    logoutUser();
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array since this runs once on mount

    // Function to update user after login (e.g., Google Login)
    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setSkills(
            Array.isArray(userData.skills)
                ? userData.skills
                : typeof userData.skills === 'string'
                    ? JSON.parse(userData.skills)
                    : []
        );
    };

    // Function to logout
    const logoutUser = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        try {
            // Send a request to blacklist the refresh token
            const response = await fetch('http://127.0.0.1:8000/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });

            if (response.ok) {
                console.log('Logged out successfully!');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Clear user data and tokens
            setUser(null);
            setSkills([]);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    };

    return (
        <UserContext.Provider value={{ user, loginUser, skills, loading, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the context
const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };