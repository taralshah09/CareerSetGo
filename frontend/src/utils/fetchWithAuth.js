// src/utils/fetchWithAuth.js

export const fetchWithAuth = async (url, options = {}) => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("access_token");
  
    // If the token exists, add the Authorization header
    if (token) {
      options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
      };
    }
  
    // Perform the fetch request
    const response = await fetch(url, options);
  
    // Handle errors or response status
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || "Something went wrong!");
    }
  
    return response.json(); // Return the JSON response
  };
  