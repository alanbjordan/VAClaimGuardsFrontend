import React from 'react';
import { Box, Button } from '@mui/material';

export function Pagination({ currentPage, totalResults, onPageChange }) {
  const resultsPerPage = 20; // matches VA site
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePrevious = (event) => {
    if (currentPage > 1) {
      onPageChange(event, currentPage - 1);
    }
  };

  const handleNext = (event) => {
    // Allow next indefinitely (or stop at totalPages if desired)
    if (currentPage < totalPages) {
      onPageChange(event, currentPage + 1);
    } else {
      onPageChange(event, currentPage + 1); // If truly infinite, remove the check
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '8px' }}>
      <Button 
        variant="outlined" 
        disabled={currentPage <= 1} 
        onClick={handlePrevious}
      >
        Previous
      </Button>
      <Button 
        variant="contained" 
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );
}
