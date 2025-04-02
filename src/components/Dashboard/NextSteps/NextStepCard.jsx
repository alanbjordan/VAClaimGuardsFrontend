// NextStepCard.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FileText, Calendar, ArrowRight } from 'lucide-react';

function NextStepCard({ type, title, description }) {
  const Icon = type === 'review' ? FileText : Calendar;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 1,
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          bgcolor: 'background.default', // Use a light background color from theme (or a custom one)
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={20} style={{ color: '#688E26' }} /> 
        {/* Adjust this color to match your theme's secondary color if desired */}
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'primary.main' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <ArrowRight
        size={20}
        style={{ color: '#A9A9A9', transition: 'color 0.3s' }}
        className="arrow-icon"
      />
    </Box>
  );
}

export default NextStepCard;
