import React from 'react';
import { Box, Paper, Avatar, Typography } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Importing the SupportAgentIcon
import PersonIcon from '@mui/icons-material/Person';

function MessageBubble({ message }) {
  const { text, isBot, timestamp } = message;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2, // Margin between messages
      }}
    >
      {/* Avatar for Bot */}
      {isBot && (
        <Avatar
          sx={{
            bgcolor: '#1976d2', // Bot avatar color
            color: '#ffffff',
            width: 40,
            height: 40,
            mr: 2, // Space between avatar and message bubble
          }}
        >
          <SupportAgentIcon fontSize="small" />
        </Avatar>
      )}

      {/* Message Bubble */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          maxWidth: '70%',
          bgcolor: isBot ? '#f5f5f5' : '#051246', // Different background for bot/user
          color: isBot ? '#333333' : '#ffffff', // Text color for bot/user
          borderRadius: isBot
            ? '12px 12px 12px 0' // Rounded corners with arrow on right
            : '12px 12px 0 12px', // Rounded corners with arrow on left
          position: 'relative',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-wrap', // Preserve line breaks
            wordBreak: 'break-word', // Prevent long words from breaking the layout
          }}
        >
          {text}
        </Typography>

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 1,
            textAlign: isBot ? 'left' : 'right',
            color: isBot ? '#777777' : '#e3f2fd', // Lighter timestamp color
          }}
        >
          {timestamp}
        </Typography>
      </Paper>

      {/* Avatar for User */}
      {!isBot && (
        <Avatar
          sx={{
            bgcolor: '#555555', // User avatar color
            color: '#ffffff',
            width: 40,
            height: 40,
            ml: 2, // Space between avatar and message bubble
          }}
        >
          <PersonIcon fontSize="small" />
        </Avatar>
      )}
    </Box>
  );
}

export default MessageBubble;
