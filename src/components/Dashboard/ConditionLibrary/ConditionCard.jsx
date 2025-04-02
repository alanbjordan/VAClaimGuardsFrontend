// components/Dashboard/ConditionLibrary/ConditionCard.jsx

import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { Hospital } from 'lucide-react';

function ConditionCard({ condition, onViewDetails }) {
  const getStatusStyles = (status) => {
    if (status === 'In-Service') {
      // In-Service
      return {
        backgroundColor: '#d32f2f', // Blue-50 equivalent
        color: '#FFFFFF', // Blue-700 equivalent
      };
    } else {
      // Current
      return {
        backgroundColor: '#DCFCE7', // Green-50 equivalent
        color: '#15803D', // Green-700 equivalent
      };
    }
  };

  const statusStyles = getStatusStyles(condition.status);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'background-color 0.3s',
        '&:hover': { backgroundColor: '#F9FAFB' }, // Surface-50 equivalent
      }}
    >
      {/* Left section with icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backgroundColor: '#F0F4FF', // Light blue background for icon
          }}
        >
          <Hospital size={24} style={{ color: '#1E3A8A' }} /> {/* Icon */}
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'primary.dark' }}>
            {condition.name}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5, alignItems: 'center' }}>
            <Chip
              label={condition.status}
              size="small"
              sx={{
                px: 1,
                py: 0.5,
                fontWeight: 500,
                ...statusStyles,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {condition.date || "No date provided"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">
            Evidence
          </Typography>
          <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'primary.dark' }}>
            {condition.evidence}
          </Typography>
        </Box>
        <Button
          variant="text"
          sx={{
            color: 'primary.main',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
}

export default ConditionCard;
