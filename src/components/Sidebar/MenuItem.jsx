// MenuItem.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSidebar } from './SidebarContext';

function MenuItem({
  icon: Icon,
  label,
  isActive,
  onClick,
  sx = {}, // 1) Accept sx from parent (default empty object)
}) {
  const { isCollapsed } = useSidebar();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: isCollapsed ? 2 : 3,
        py: 1.5,
        cursor: 'pointer',
        transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
        justifyContent: isCollapsed ? 'center' : 'flex-start',
        '&:hover': {
          background: 'linear-gradient(180deg, rgba(248, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.03) 100%)',
          borderLeft: '4px solid #c91217',
        },
        background: isActive
          ? 'linear-gradient(180deg, rgba(248, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.03) 100%)'
          : 'transparent',
        color: isActive ? '#FFFFFF' : '#C91217',
        borderRadius: 1,
        borderLeft: isActive ? '4px solid #C91217' : '4px solid transparent',

        // 2) Merge in the parent's sx styles (like indentation, smaller font, etc)
        ...sx,
      }}
    >
      {Icon && (
        <Icon
          size={20}
          style={{
            color: isActive ? '#FFFFFF' : '#FFFFFF',
          }}
        />
      )}

      {!isCollapsed && (
        <Typography
          variant="body2"
          sx={{
            ml: 2,
            color: isActive ? '#FFFFFF' : '#FFFFFF',
            fontWeight: isActive ? 500 : 400,
            // Ensure the Typography inherits fontSize if parent sets it
            fontSize: 'inherit',
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

export default MenuItem;
