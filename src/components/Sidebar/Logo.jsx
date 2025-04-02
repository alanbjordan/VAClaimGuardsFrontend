import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Menu, ChevronLeft } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import logo from '../../assets/logo_white.png'; // Import your logo

function Logo() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isCollapsed ? 'center' : 'space-between', // Center when collapsed
        px: 2,
        py: 2, // Adjust padding for better spacing
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#051246', // Ensure background matches Figma design
      }}
    >
      {!isCollapsed && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Align content in the center
            gap: 1,
          }}
        >
          {/* Replace the Shield icon with your logo */}
          <img
            src={logo}
            alt="ClaimGuard Logo"
            style={{ height: '52px', width: 'auto' }} // Make the logo slightly larger
          />
        </Box>
      )}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          p: 1,
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Match Figma hover effect
          },
        }}
      >
        {isCollapsed ? (
          <Menu size={20} style={{ color: '#6B7280' }} />
        ) : (
          <ChevronLeft size={20} style={{ color: '#6B7280' }} />
        )}
      </IconButton>
    </Box>
  );
}

export default Logo;
