//DocumentHeader component is used to display the header of the Document Management page. It contains a back button to navigate back to the dashboard and an upload button to upload documents. The component is used in the Documents.jsx file.

import React from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { ChevronLeft, Upload } from 'lucide-react';

export function DocumentHeader({ onBackClick, onUploadClick }) {
  return (
    <Box mb={4}>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        mb={2}
      >
        {/* Updated "Back to Dashboard" to match SearchHeader styling */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': { color: 'text.primary' },
          }}
          onClick={onBackClick}
        >
          <IconButton size="small" sx={{ color: 'inherit', padding: 0 }}>
            <ChevronLeft fontSize="small" />
          </IconButton>
          <Typography variant="body2">Back to Dashboard</Typography>
        </Box>

        {/* "Upload Documents" button remains unchanged */}
        <Button
          variant="contained"
          startIcon={<Upload size={16} />}
          onClick={onUploadClick}
          sx={{
            backgroundColor: 'primary.main',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Upload Documents
        </Button>
      </Box>

      <Typography variant="h3" color="primary" gutterBottom>
        Document Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage and organize your important documents in one secure location.
      </Typography>
    </Box>
  );
}
