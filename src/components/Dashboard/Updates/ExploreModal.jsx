// ./Dashboard/Updates/ExploreModal.jsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ExploreModal({ open, onClose, selectedUpdate }) {
  const navigate = useNavigate();

  const conditions = selectedUpdate?.conditions || [];
  const nexusTagId = selectedUpdate?.nexus_tags_id;

  // Handler to go to the chat page with the nexus data
  const handleAskChat = () => {
    // 1) Build some pre-filled message or pass the raw data
    const message = `Explain how these conditions should lead to a nexus for service connection and ask the user if they want a nexus letter example generated for them to take to their doctor. nexus_tag_id=${nexusTagId}. Conditions: ${JSON.stringify(
      conditions
    )}`;

    // 2) Navigate to /chat, passing the data in route state
    navigate('/chat', {
      state: {
        preMessage: message,
        nexusTagId: nexusTagId,
        fromExploreModal: true, // <--- This indicates they came from "Ask Assistant"
      },
    });

    // Optionally close the modal
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      // Ensure the background is white
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          borderRadius: 2, // Slight rounding for a modern look
        },
      }}
    >
      {/* Dialog Title with bolder, larger text */}
      <DialogTitle
        sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'text.primary',
          pb: 1, // Subtle bottom padding
        }}
      >
        Nexus Details
      </DialogTitle>

      {/* Optional small subtitle to provide context */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ px: 3, pb: 1 }}
      >
        Review the detailed information related to this potential nexus.
      </Typography>

      <Divider />

      {/* Dialog Content with extra spacing */}
      <DialogContent
        dividers
        sx={{
          py: 2,
          px: 3,
        }}
      >
        {conditions.length > 0 ? (
          <List sx={{ padding: 0 }}>
            {conditions.map((cond, idx) => {
              const serviceStatus = cond.in_service ? 'In Service' : 'Post Service';

              return (
                <ListItem
                  key={idx}
                  disableGutters
                  sx={{
                    mb: idx !== conditions.length - 1 ? 2 : 0, // spacing between items
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                    secondaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.secondary',
                    }}
                    primary={cond.condition_name || 'Unknown Condition'}
                    secondary={
                      <>
                        {cond.date_of_visit && (
                          <>
                            <strong>Date of Visit:</strong> {cond.date_of_visit}
                            <br />
                          </>
                        )}
                        <strong>Status:</strong> {serviceStatus}
                        <br />
                        {cond.medical_professionals && (
                          <>
                            <strong>Medical Professionals:</strong> {cond.medical_professionals}
                            <br />
                          </>
                        )}
                        {cond.findings && (
                          <>
                            <strong>Findings:</strong> {cond.findings}
                            <br />
                          </>
                        )}
                        {cond.treatments && cond.treatments.trim() && (
                          <>
                            <strong>Treatments:</strong> {cond.treatments}
                            <br />
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No conditions were found for this update.
          </Typography>
        )}
      </DialogContent>

      {/* Dialog actions with a bit more spacing and modern flair */}
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Close
        </Button>

        <Button
          onClick={handleAskChat}
          variant="contained"
          color="primary"
          sx={{
            ml: 1,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
        >
          Ask Chat Assistant
        </Button>
      </DialogActions>
    </Dialog>
  );
}
