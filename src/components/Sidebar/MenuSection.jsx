// MenuSection.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSidebar } from './SidebarContext';

function MenuSection({ title, children }) {
  const { isCollapsed } = useSidebar();

  return (
    <Box sx={{ mb: 3 }}>
      {!isCollapsed && (
        <Typography
        variant="caption" // Smaller, uppercase style
        sx={{
          display: 'block',
          px: 2,
          mb: 1,
          color: '#FFFFFF',
          fontWeight: 600,
          textTransform: 'uppercase', // Matches Figma overline style
          letterSpacing: '0.08em', // Slightly increased for better readability
          fontSize: '0.75rem', // Adjust font size
        }}
      >
        {title}
      </Typography>
      
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>{children}</Box>
    </Box>
  );
}

export default MenuSection;
