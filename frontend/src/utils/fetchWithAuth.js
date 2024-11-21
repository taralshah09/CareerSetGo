export const fetchWithAuth = async (url, options = {}) => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken) {
    console.log("No access token found");
    return;
  }

  // Set headers with access token and include refresh token if needed
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  if (url === 'http://127.0.0.1:8000/api/logout/') {
    // Add refresh token if it's a logout request
    options.body = JSON.stringify({ refresh_token: refreshToken });
  }

  try {
    const response = await fetch(url, options);

    const rawData = await response.text();  // Get raw response
    console.log("Raw response:", rawData);  // Log the raw response

    if (!response.ok) {
      const errorData = JSON.parse(rawData);  // Parse error data
      throw new Error(errorData?.error || "Something went wrong!");
    }

    return JSON.parse(rawData);  // Parse and return the JSON response
  } catch (error) {
    console.error("Error fetching with auth:", error);
    throw error;  // Rethrow the error for handling in the calling function
  }
};
