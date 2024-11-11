// components/CountryDropdown.js
import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CountryDropdown = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    // Fetch list of countries from an API
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        // Sort countries by name and map to a simpler array of names
        const countryNames = data
          .map(country => country.name.common)
          .sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
    if (onSelect) {
      onSelect(event.target.value); // Trigger onSelect callback with selected country
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Select Country</InputLabel>
      <Select
        label="Select Country"
        value={selectedCountry}
        onChange={handleChange}
      >
        {countries.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryDropdown;
