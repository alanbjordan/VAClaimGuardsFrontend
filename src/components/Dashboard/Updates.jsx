// src/components/Dashboard/Updates.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExploreModal from './Updates/ExploreModal.jsx';
import UpdateIcon from './Updates/UpdateIcon.jsx';

/** A small helper to display the same update layout in two places. */
function renderSingleUpdate({ update, index, handleOpen, getActionText }) {
  const type = 'nexus'; // Hard-coded example type
  const title = `Potential Nexus Found: ${update.disability_name || 'Unknown Tag'}`;
  const description = `${update.conditions?.length || 0} diagnosis found for this nexus.`;
  const details =
    update.conditions?.length > 0
      ? `First condition: ${update.conditions[0].condition_name}`
      : null;
  const dateString = update.discovered_at
    ? new Date(update.discovered_at).toLocaleDateString()
    : 'Unknown date';

  return (
    <Box
      key={update.nexus_tags_id || index}
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'background-color 0.3s',
        backgroundColor: '#ffffff', // Consistent white background
        '&:hover': {
          backgroundColor: '#f9fafb', // Light gray hover effect
        },
      }}
    >
      <UpdateIcon type={type} />

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: 'text.primary' }}
          >
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {dateString}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.primary', mt: 0.5 }}>
          {description}
        </Typography>

        {details && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {details}
          </Typography>
        )}

        {/* Click to open the single-update ExploreModal */}
        <Button
          variant="text"
          sx={{
            mt: 1,
            p: 0,
            minWidth: 'auto',
            fontSize: '0.875rem',
            textTransform: 'none',
            color: 'primary.main',
            '&:hover': { color: 'primary.dark' },
          }}
          onClick={() => handleOpen(update)}
        >
          {getActionText(type)}
        </Button>
      </Box>
    </Box>
  );
}

// Helper to get the button text
function getActionText(type) {
  switch (type) {
    case 'event':
      return 'Review Details';
    case 'condition':
      return 'View Evidence';
    case 'nexus':
      return 'Review Linking Evidence';
    default:
      return 'View Details';
  }
}

/**
 * Updates Component
 *
 * @param {Object} props
 * @param {Array} props.updates - The updates data (initially summary data).
 * @param {boolean} props.isLoading - Loading state indicator.
 */
export default function Updates({ updates = [], isLoading = false }) {
  const navigate = useNavigate();

  // For single-update ExploreModal
  const [open, setOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  /** Opens the single-update ExploreModal. */
  const handleOpen = (update) => {
    setSelectedUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUpdate(null);
  };

  // Limit updates to the first 3 for display on the dashboard
  const limitedUpdates = updates.slice(0, 3);

  return (
    <Paper
      sx={{
        width: '100%',
        backgroundColor: '#ffffff', // White background
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 1,
        p: 3,
        mb: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ color: 'text.primary' }}>
          Nexus Updates
        </Typography>
        <Button
          variant="text"
          sx={{
            fontSize: '0.875rem',
            textTransform: 'none',
            p: 0,
            minWidth: 'auto',
            color: 'primary.main',
            '&:hover': { color: 'primary.dark' },
          }}
          // Navigate to the dedicated Nexus Updates page
          onClick={() => navigate('/nexus-updates')}
        >
          View All
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Track your evolving assessment
      </Typography>

      {isLoading ? (
        // Loading skeleton
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderRadius: 2,
              }}
            >
              <Skeleton variant="circular" width={24} height={24} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : updates.length === 0 ? (
        // No updates found
        <Typography variant="body2" color="text.secondary">
          No new nexus updates found.
        </Typography>
      ) : (
        // Limited list of updates (max 3)
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {limitedUpdates.map((update, index) =>
            renderSingleUpdate({
              update,
              index,
              handleOpen,
              getActionText,
            })
          )}
        </Box>
      )}

      {/* Single-update ExploreModal */}
      <ExploreModal open={open} onClose={handleClose} selectedUpdate={selectedUpdate} />
    </Paper>
  );
}
