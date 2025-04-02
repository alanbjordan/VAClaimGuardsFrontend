import React, { useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export default function Toast({ show, message, duration = 3000, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <Snackbar
      open={show}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        severity="success"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{ alignItems: 'center' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
