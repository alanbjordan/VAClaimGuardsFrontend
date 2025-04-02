//LeftPanel.jsx

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ShieldOutlined as ShieldIcon } from '@mui/icons-material';
import VeteranFlag from '../../assets/VeteranFlag.png';

export default function LeftPanel() {
  return (
    <Grid
      item
      xs={0}
      sm={4}
      md={5}
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 4,
        position: 'relative',
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundImage: `url(${VeteranFlag})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
      </Box>
      <Box sx={{ position: 'relative', zIndex: 1, mt: 'auto' }}>
        <blockquote style={{ color: 'white' }}>
          <Typography variant="h6" component="p" sx={{ mb: 1 }}>
            "VA Claim Guard ensures veterans get the right evidence for the right claim, making the VA disability process smarter and more efficient."
          </Typography>
        </blockquote>
      </Box>
    </Grid>
  );
}
