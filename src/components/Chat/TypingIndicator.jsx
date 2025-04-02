// TypingIndicator.jsx
import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, keyframes } from '@mui/material';
import AndroidIcon from '@mui/icons-material/Android';

const pulse = keyframes`
  0% {
    transform: scale(0.4);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.4);
    opacity: 0.7;
  }
`;

function TypingIndicator() {
  // Sequence of status messages
  const statuses = [
    'Agent is thinking...',
    'Still thinking...',
    'Generating response...',
    'Making final changes...'
  ];

  // Track which status we’re on
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // If we haven’t reached the last status, advance every 5 seconds
    if (phase < statuses.length - 1) {
      const timer = setTimeout(() => {
        setPhase((prev) => prev + 1);
      }, 5000); // 5-second interval
      return () => clearTimeout(timer);
    }
  }, [phase, statuses.length]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
      }}
    >
      <Avatar sx={{ bgcolor: 'secondary.light', width: 32, height: 32 }}>
        <AndroidIcon fontSize="small" />
      </Avatar>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Dynamically updated status text */}
        <Typography variant="body2" sx={{ fontStyle: 'italic', mr: 1 }}>
          {statuses[phase]}
        </Typography>

        {/* Three pulsing "bubble" indicators */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: `${pulse} 1.0s infinite`,
            }}
          />
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: `${pulse} 1.0s infinite`,
              animationDelay: '0.2s',
            }}
          />
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              animation: `${pulse} 1.0s infinite`,
              animationDelay: '0.4s',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TypingIndicator;
