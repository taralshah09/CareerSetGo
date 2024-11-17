import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const FindEmployerCard = ({ company, location, image: imageUrl, deadline }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        boxShadow: "none",
        "&:hover": {
          border: "1px solid #0A65CC",
        },
      }}
    >
      {/* Job Image */}
      <Box
        sx={{
          width: 50,
          height: 50,
          margin: "1rem",
          borderRadius: "8px",
          backgroundColor: "#767F8C",
          backgroundImage: `url(${imageUrl})`, // Dynamic image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Job Details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Typography variant="h6" className="jobtitle">
            {company}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: "1rem" }}>
          {/* Location */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <LocationOnIcon fontSize="small" sx={{ color: "#5E6670" }} />
            <Typography variant="body2" sx={{ color: "#5E6670" }}>
              {location}
            </Typography>
          </Box>

          {/* Deadline */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <CalendarTodayIcon fontSize="small" sx={{ color: "#5E6670" }} />
            <Typography variant="body2" sx={{ color: "#5E6670" }}>
              {deadline}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Action Button */}
      <Box sx={{ display: "flex", alignItems: "center", pr: "1rem" }}>
        <Button
          variant={isHovered ? "contained" : "outlined"}
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: isHovered ? "#0A65CC" : "#E7F0FA",
            color: isHovered ? "#ffffff" : "#0A65CC",
            borderColor: "#0A65CC",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#0A65CC",
              color: "#ffffff",
            },
          }}
        >
          Open Position
        </Button>
      </Box>
    </Card>
  );
};

export default FindEmployerCard;
