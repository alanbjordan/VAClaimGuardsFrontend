// src/components/Claims/ClaimCard.jsx
import React from 'react';
import { Paper, Box, Typography, LinearProgress } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

const ClaimCard = ({ claim }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the detailed view for this claim.
    navigate(`/claims/${claim.claim_id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <FolderIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
      <Typography variant="h6" align="center">
        {claim.claim_name}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {claim.status}
      </Typography>
      <Box mt={2} width="100%">
        <LinearProgress variant="determinate" value={claim.evidence_progress || 0} />
        <Typography variant="caption" display="block" align="center">
          {claim.evidence_progress || 0}% Evidence Collected
        </Typography>
      </Box>
    </Paper>
  );
};

export default ClaimCard;
