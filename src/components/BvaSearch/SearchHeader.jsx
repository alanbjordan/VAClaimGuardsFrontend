// SearchHeader.jsx

import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export function SearchHeader({ onBackClick }) {
  const navigate = useNavigate();

  const handleSavedDecisions = () => {
    navigate('/saved-decisions');
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      {/* Back to Dashboard */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.secondary',
          marginBottom: 2,
          cursor: 'pointer',
          '&:hover': {
            color: 'text.primary',
          },
        }}
        onClick={onBackClick}
      >
        <IconButton size="small" sx={{ color: 'inherit', padding: 0 }}>
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2">Back to Dashboard</Typography>
      </Box>

      {/* Header Text */}
      <Typography
        variant="h4"
        color="primary"
        sx={{ fontWeight: 'bold', marginBottom: 1 }}
      >
        BVA Decision Search
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
        Find Board of Veterans' Appeals decisions using keywords, filters, and categories.
      </Typography>

      {/* New Button: View Saved Decisions */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSavedDecisions}
      >
        View Saved Decisions
      </Button>
    </Box>
  );
}
