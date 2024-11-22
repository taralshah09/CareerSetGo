import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Cookies from "js-cookie";  // Import Cookies to retrieve username from cookie

const UserProfile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const usernameFromCookie = Cookies.get('username');
    setUsername(usernameFromCookie || ""); // Set username state
  }, []);

  return (
    <Typography variant="h4">
      Hello, {username}!
    </Typography>
  );
};

export default UserProfile;
