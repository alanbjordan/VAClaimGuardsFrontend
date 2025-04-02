// src/pages/ClaimDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography, TextField } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useParams, useNavigate } from 'react-router-dom';

// 1) Import local mock functions for single-claim retrieval, update, and delete
import {
  getClaimById,
  updateMockClaim,
  deleteMockClaim,
} from '../data/mockClaims';

const ClaimDetailsPage = () => {
  const { claimId } = useParams();
  const navigate = useNavigate();

  // Local states for claim data, loading, errors, editing mode, and form data
  const [claim, setClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // The formData object we use to edit the claim
  const [formData, setFormData] = useState({
    claim_name: '',
    status: '',
    description: '',
    condition_ids: [],
    evidence_progress: 0,
  });

  // 2) On mount or claimId change, load the claim from local mock data
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Optional short delay to simulate loading
    setTimeout(() => {
      getClaimById(claimId)
        .then((data) => {
          // Store the entire claim
          setClaim(data);

          // Update our form fields for editing
          setFormData({
            claim_name: data.claim_name,
            status: data.status || 'Draft',
            description: data.description || '',
            condition_ids: data.condition_ids || [],
            evidence_progress: data.evidence_progress || 0,
          });
        })
        .catch((err) => {
          console.error('Error loading mock claim:', err);
          setError('Failed to fetch claim details (mock).');
        })
        .finally(() => setIsLoading(false));
    }, 500);
  }, [claimId]);

  // 3) Toggle between "view" and "edit" modes
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // 4) Keep track of changes in the form fields
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 5) Save the edited claim to local memory
  const handleSave = async () => {
    try {
      // Call updateMockClaim with the current ID and new formData
      const updatedClaim = await updateMockClaim(claimId, formData);
      setClaim(updatedClaim);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error saving mock claim:', err);
      setError('Failed to save claim (mock).');
    }
  };

  // 6) Delete the claim from local memory
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this claim?')) return;

    try {
      await deleteMockClaim(claimId);
      navigate('/claims'); // Return to claims overview
    } catch (err) {
      console.error('Error deleting mock claim:', err);
      setError('Failed to delete claim (mock).');
    }
  };

  // --- Render States ---

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Loading claim details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
        <Button onClick={() => navigate('/claims')} variant="contained" sx={{ mt: 2 }}>
          Back to Claims
        </Button>
      </Box>
    );
  }

  if (!claim) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Claim not found.</Typography>
        <Button onClick={() => navigate('/claims')} variant="contained" sx={{ mt: 2 }}>
          Back to Claims
        </Button>
      </Box>
    );
  }

  // --- Main View ---
  return (
    <Box p={3}>
      {/* 7) Button to go back to overview */}
      <Button onClick={() => navigate('/claims')} variant="outlined" sx={{ mb: 2 }}>
        Back to Claims
      </Button>

      <Box display="flex" alignItems="center" mb={3}>
        <FolderIcon sx={{ fontSize: 64, mr: 2 }} color="primary" />
        <Typography variant="h4">{claim.claim_name}</Typography>
      </Box>

      {isEditing ? (
        // --- Edit Mode ---
        <Box>
          <TextField
            fullWidth
            label="Claim Name"
            value={formData.claim_name}
            onChange={(e) => handleFormChange('claim_name', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Status"
            value={formData.status}
            onChange={(e) => handleFormChange('status', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleFormChange('description', e.target.value)}
            sx={{ mb: 2 }}
          />
          {/* Additional fields like condition_ids or evidence_progress if desired */}
          <TextField
            fullWidth
            label="Evidence Progress (%)"
            type="number"
            value={formData.evidence_progress}
            onChange={(e) => handleFormChange('evidence_progress', e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleEditToggle}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        // --- View Mode ---
        <Box>
          <Typography variant="h6">Status: {claim.status}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {claim.description || 'No Description Provided'}
          </Typography>
          <Box mt={2}>
            <Typography variant="caption">
              Evidence Collected: {claim.evidence_progress || 0}%
            </Typography>
          </Box>
          <Box mt={3} display="flex" gap={2}>
            <Button variant="contained" onClick={handleEditToggle}>
              Edit Claim
            </Button>
            <Button variant="outlined" onClick={handleDelete} color="error">
              Delete Claim
            </Button>
            <Button variant="outlined" onClick={() => console.log('Add evidence logic here')}>
              Add Evidence
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ClaimDetailsPage;
