// NextSteps.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import NextStepCard from './NextStepCard';

function NextSteps() {
  return (
    <Paper
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ color: 'primary.main', mb: 2 }}>
        Next Steps
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <NextStepCard
          type="review"
          title="Review New Nexus Potentials"
          description="2 connections identified"
        />
        <NextStepCard
          type="schedule"
          title="Schedule Consultation"
          description="Get expert guidance"
        />
      </Box>
    </Paper>
  );
}

export default NextSteps;
