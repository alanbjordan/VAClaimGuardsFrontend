import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';

function ChatHeader() {
  const handlePrint = () => {
    window.print(); // Simple print functionality
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      // Implement chat clearing logic here
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#ffffff', // White background
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for header
        borderBottom: '1px solid #ddd', // Light border at the bottom
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '64px',
          px: 2, // Padding on left and right
        }}
      >
        {/* Left Section: Avatar and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              mr: 2,
              bgcolor: '#051246', // Primary color for avatar background
              color: '#ffffff', // White icon color
            }}
          >
            <ChatBubbleOutlineIcon />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#333333', // Dark text color for title
            }}
          >
            Claims Assistant
          </Typography>
        </Box>

        {/* Right Section: Print, Delete, and Settings Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Print Button */}
          <IconButton
            onClick={handlePrint}
            sx={{
              color: '#051246', // Muted gray for icon
              '&:hover': {
                color: '#d32f2f', // Primary color on hover
              },
            }}
          >
            <PrintIcon />
          </IconButton>

          {/* Delete Button */}
          <IconButton
            onClick={handleDelete}
            sx={{
              color: '#051246', // Muted gray for icon
              '&:hover': {
                color: '#d32f2f', // Red color on hover
              },
            }}
          >
            <DeleteIcon />
          </IconButton>

          {/* Settings Button
          <IconButton
            sx={{
              color: '#555555', // Muted gray for icon
              '&:hover': {
                color: '#1976d2', // Primary color on hover
              },
            }}
          >
            <SettingsIcon />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ChatHeader;
