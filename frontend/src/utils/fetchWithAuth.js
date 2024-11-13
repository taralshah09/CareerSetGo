export const fetchWithAuth = async (url, options = {}) => {
  // Retrieve the JWT token from localStorage
  const token = JSON.parse(localStorage.getItem("accesstoken"));

  if (!token) {
    console.log("Token doesn't exist!");
    return;
  }
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.detail || "Something went wrong!");
  }

  return response.json();
};