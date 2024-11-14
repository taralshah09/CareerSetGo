import React from 'react';
import { Box, MenuItem, Select, IconButton, Button } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const FilterOptions = ({ setPerPage }) => {
  const [sortOption, setSortOption] = React.useState('Latest');
  const [perPageValue, setPerPageValue] = React.useState(6); // Default to 6 per page

  const handlePerPageChange = (event) => {
    setPerPageValue(event.target.value);
    setPerPage(event.target.value); // Pass the selected value to parent component
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: '1rem', marginLeft: '16px' }}
          startIcon={<ViewListIcon />}
        >
          Filter
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          sx={{
            minWidth: 120,
            backgroundColor: '#fff',
            height: '40px',
            fontSize: '0.875rem',
            '.MuiSelect-select': {
              padding: '4px 8px',
            },
          }}
        >
          <MenuItem value="Latest">Latest</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
        </Select>
        <Select
          value={perPageValue}
          onChange={handlePerPageChange}
          sx={{
            minWidth: 120,
            backgroundColor: '#fff',
            height: '40px',
            fontSize: '0.875rem',
            '.MuiSelect-select': {
              padding: '4px 8px',
            },
          }}
        >
          <MenuItem value={6}>6 per page</MenuItem>
          <MenuItem value={8}>8 per page</MenuItem>
          <MenuItem value={10}>10 per page</MenuItem>
        </Select>
        <IconButton>
          <ViewModuleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FilterOptions;
