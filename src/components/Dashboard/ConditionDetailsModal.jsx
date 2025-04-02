// src/components/Dashboard/ConditionDetailsModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Chip } from '@mui/material';

function ConditionDetailsModal({ open, onClose, condition }) {
  if (!condition) {
    return null; // If no condition is provided, don't render anything.
  }

  const {
    condition_name,
    date_of_visit,
    in_service,
    medical_professionals,
    medications_list,
    treatments,
    findings,
    comments,
    file
  } = condition;

  const status = in_service ? "In-Service" : "Current";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: 'primary.dark' }}>
        {condition_name || "Condition Details"}
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography  color="text.secondary">
            Status
          </Typography>
          <Chip
            label={status}
            size="small"
            sx={{
              mt: 0.5,
              backgroundColor: in_service ? 'blue.50' : 'green.50',
              color: in_service ? 'blue.700' : 'green.700',
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            Date of Visit
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {date_of_visit || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography  color="text.secondary">
            Medical Professionals
          </Typography>
          <Typography  sx={{ mt: 0.5 }}>
            {medical_professionals || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography  color="text.secondary">
            Findings
          </Typography>
          <Typography  sx={{ mt: 0.5 }}>
            {findings || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography  color="text.secondary">
            Medications
          </Typography>
          {Array.isArray(medications_list) && medications_list.length > 0 ? (
            <Box sx={{ mt: 0.5 }}>
              {medications_list.map((med, idx) => (
                <Typography  key={idx}>
                  {med}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography  sx={{ mt: 0.5 }}>
              Not provided
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography  color="text.secondary">
            Treatments
          </Typography>
          <Typography  sx={{ mt: 0.5 }}>
            {treatments || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            Comments
          </Typography>
          <Typography  sx={{ mt: 0.5 }}>
            {comments || "Not provided"}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography color="text.secondary">
            File
          </Typography>
          {file && file.url ? (
            <Typography sx={{ mt: 0.5 }}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name || 'View File'}</a>
            </Typography>
          ) : (
            <Typography  sx={{ mt: 0.5 }}>
              Not provided
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose} sx={{ textTransform: 'none' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConditionDetailsModal;
