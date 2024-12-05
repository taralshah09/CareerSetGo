import React from "react";
import { Pagination } from "@mui/material";

const TestimonialPagination = ({ count, onPageChange }) => {
  return (
    <Pagination
      count={count}
      onChange={onPageChange}
      sx={{ mt: 3, justifyContent: "center", display: "flex" }}
    />
  );
};

export default TestimonialPagination;
