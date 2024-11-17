import React, { useState } from "react";
import {
  Box,
  Avatar,
  Badge,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const JobCard = ({ logo, title, badge, location, salary, dateApplied, status, onAction }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      elevation={2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: "100%",
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
        border: isHovered ? "1px solid #0A65CC" : "1px solid transparent",
        transition: "border 0.3s ease",
      }}
    >
      <Grid container alignItems="center">
        {/* Job Info */}
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={logo}
            alt={`${title} Logo`}
            variant="rounded"
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            {/* Job Title and Badge */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", lineHeight: 1.2, mb: 0.5, mr: 4.5 }}
              >
                {title}
              </Typography>
              <Badge
                badgeContent={badge}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#e1ecf4",
                    color: "#007bff",
                    fontSize: 12,
                    padding: "8px 10px",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  },
                }}
              />
            </Box>
            {/* Location and Salary on One Line */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2,mt:0.5 }}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <LocationOnIcon fontSize="small" color="action" />
                {location}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <AttachMoneyIcon fontSize="small" color="action" />
                {salary}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Date Applied */}
        <Grid item xs={2}>
          <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
            {dateApplied}
          </Typography>
        </Grid>

        {/* Status */}
        <Grid item xs={2}>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#28a745",
              fontWeight: "bold",
            }}
          >
            <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
            {status}
          </Typography>
        </Grid>

        {/* Action Button */}
        <Grid item xs={2} sx={{ textAlign: "center" }}>
          <Button
            variant={isHovered ? "contained" : "outlined"}
            onClick={onAction}
            sx={{
              width: "70%",
              marginLeft: "20%",
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
            View Details
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCard;
