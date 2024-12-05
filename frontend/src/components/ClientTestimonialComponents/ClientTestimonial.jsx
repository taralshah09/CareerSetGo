import React, { useState } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import TestimonialCard from "./TestimonialCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const testimonials = [
  {
    name: "Robert Fox",
    designation: "UI/UX Designer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHjGUrjPdrvGLWYSegpkeW6RH7xGxYPdZaA&s",
    rating: 5,
    comment:
      "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
  },
  {
    name: "Bessie Cooper",
    designation: "Creative Director",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHjGUrjPdrvGLWYSegpkeW6RH7xGxYPdZaA&s",
    rating: 5,
    comment:
      "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate.",
  },
  {
    name: "Jane Cooper",
    designation: "Photographer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHjGUrjPdrvGLWYSegpkeW6RH7xGxYPdZaA&s",
    rating: 5,
    comment:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse magna.",
  },
  {
    name: "Jane Cooper",
    designation: "Photographer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHjGUrjPdrvGLWYSegpkeW6RH7xGxYPdZaA&s",
    rating: 5,
    comment:
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse magna.",
  },
  {
    name: "Robert Fox",
    designation: "UI/UX Designer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHjGUrjPdrvGLWYSegpkeW6RH7xGxYPdZaA&s",
    rating: 5,
    comment:
      "Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.",
  },
  {
    name: "Bessie Cooper",
    designation: "Creative Director",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHjGUrjPdrvGLWYSegpkeW6RH7xGxYPdZaA&s",
    rating: 5,
    comment:
      "Mauris eget lorem odio. Mauris convallis justo molestie metus aliquam lacinia. Suspendisse ut dui vulputate.",
  }
];

const ClientTestimonials = () => {
  const [page, setPage] = useState(1);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleDotClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * testimonialsPerPage;
  const selectedTestimonials = testimonials.slice(
    startIndex,
    startIndex + testimonialsPerPage
  );

  return (
    <Box sx={{ py: 5, textAlign: "center", backgroundColor: "#F1F2F4" }}>
      <Typography variant="h4" gutterBottom>
        Clients Testimonial
      </Typography>
      <Grid container justifyContent="center" alignItems="center">
        <IconButton
          onClick={handlePrevPage}
          disabled={page === 1}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: "#FFFFFF",
            color: "#0A65CC",
            borderRadius: "8px",
            '&:hover': {
              backgroundColor: "#FFFFFF",
            },

          }}
        >
          <ArrowBack />
        </IconButton>

        {selectedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}

        <IconButton
          onClick={handleNextPage}
          disabled={page === totalPages}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: "#FFFFFF",
            color: "#0A65CC",
            borderRadius: "8px",
            '&:hover': {
              backgroundColor: "#FFFFFF",
            },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Grid>


      <Box sx={{ mt: 2 }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleDotClick(index + 1)}
            sx={{
              width: "8px",
              height: "8px",
              padding: 0,
              margin: "0 4px",
              borderRadius: "50%",
              backgroundColor: page === index + 1 ? "#0066FF" : "#99C2FF",
              '&:hover': {
                backgroundColor: page === index + 1 ? "#0066FF" : "#99C2FF",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ClientTestimonials;
