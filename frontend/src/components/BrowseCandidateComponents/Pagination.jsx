import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ count, page, onChange }) => {
  return (
    <Pagination count={count} page={page} onChange={onChange} color="primary" />
  );
};

export default PaginationComponent;
