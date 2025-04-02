// src/components/DecisionDetails/SummaryModal.jsx

import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

export function SummaryModal({ open, onClose, summary }) {
  // If no summary or empty string, render nothing
  if (!summary) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Decision Summary</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" component="div">
          {/**
           * Just render the markdown string. The parent
           * component (DecisionDetails) is responsible for
           * constructing the string from an object.
           */}
          <ReactMarkdown>{summary}</ReactMarkdown>
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SummaryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // Now it's just a string, since we do all the object->markdown logic upstream
  summary: PropTypes.string,
};
