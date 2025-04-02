import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import UpdateIcon from './UpdateIcon';

function UpdateCard({ update, onExplore }) {
  // Hardcode 'type' to 'nexus' to display the Link icon
  const type = 'nexus';

  // Convert discovered_at to a human-readable date
  const dateString = update.discovered_at
    ? new Date(update.discovered_at).toLocaleDateString()
    : 'Unknown date';

  // Derive a title from disability_name
  const title = `Potential Nexus Found: ${update.disability_name || 'Unknown Tag'}`;

  // Summarize conditions
  const numberOfConditions = update.conditions ? update.conditions.length : 0;
  const description = `${numberOfConditions} diagnosis found for this tag.`;

  // Label for the button
  const getActionText = (t) => (t === 'nexus' ? 'Explore Connection' : 'View Details');

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      {/* Left Icon */}
      <Box sx={{ mt: '4px' }}>
        <UpdateIcon type={type} />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'primary.main' }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {dateString}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.primary">
          {description}
        </Typography>

        {numberOfConditions > 0 && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            First condition: {update.conditions[0].condition_name}
          </Typography>
        )}

        <Button
          variant="text"
          sx={{
            mt: 1.5,
            p: 0,
            minWidth: 'auto',
            fontSize: '0.875rem',
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': { color: 'primary.dark' },
          }}
          onClick={() => onExplore && onExplore(update)}
        >
          {getActionText(type)}
        </Button>
      </Box>
    </Paper>
  );
}

export default UpdateCard;
