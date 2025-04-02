// Toast.jsx is a component that renders a toast notification.


import React, { useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import PropTypes from 'prop-types';

export function Toast({ show, message, type, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Snackbar
      open={show}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        iconMapping={{
          success: <CheckCircle style={{ color: '#fff' }} />,
          error: <AlertCircle style={{ color: '#fff' }} />,
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: type === 'success' ? 'success.main' : 'error.main',
          color: '#fff',
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <X fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};
