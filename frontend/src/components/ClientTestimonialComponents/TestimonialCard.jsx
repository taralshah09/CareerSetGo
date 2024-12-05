import React from "react";
import { Card, Typography, Avatar, Box } from "@mui/material";
import { Star, FormatQuote } from "@mui/icons-material";

const TestimonialCard = ({ name, designation, image, rating, comment }) => {
  return (
    <Card
    sx={{
      width: 350,
      height: 250,
      m: 2,
      p: 2,
      borderRadius: "12px", 
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
    >
      <Box>
        <Box display="flex" alignItems="center" mb={2}>
          {[...Array(rating)].map((_, index) => (
            <Star key={index} sx={{ color: "#FFAA00" }} />
          ))}
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography
            color="#464D61"
            sx={{
              textOverflow: "ellipsis",
              height: "80px",
              textAlign: "left",
            }}
          >
            {comment}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
        <Box display="flex" alignItems="center">
          <Avatar src={image} alt={name} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ textAlign: "left" }}>
              {name}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: "left" }}>
              {designation}
            </Typography>
          </Box>
        </Box>
        <FormatQuote sx={{ fontSize: 40, color: "#d3d3d3", ml: 2 }} />
      </Box>
    </Card>
  );
};

export default TestimonialCard;
