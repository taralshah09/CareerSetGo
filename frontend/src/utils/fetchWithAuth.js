export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("access_token");

  if (!token) {
    console.log("Token doesn't exist!");
    throw new Error("No authentication token found");
  }

  // Set default headers
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Add this line
  };

  const response = await fetch(url, options);

  if (response.status === 401) {
    // Handle token refresh here if you have a refresh token
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem("access_token", data.access);
        options.headers.Authorization = `Bearer ${data.access}`;
        return fetch(url, options).then((res) => res.json());
      }
    }
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.detail || "Something went wrong!");
  }

  return response.json();
};