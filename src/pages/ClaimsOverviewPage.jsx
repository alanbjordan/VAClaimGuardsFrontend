// src/pages/ClaimsOverviewPage.jsx

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button, Grid } from '@mui/material';
import ClaimCard from '../components/Claims/ClaimCard';
import NewClaimDialog from '../components/Claims/NewClaimDialog';

// 1) Import the mock functions
import {
  getAllMockClaims,
  createMockClaim,
  updateMockClaim,
  deleteMockClaim,
} from '../data/mockClaims';

const ClaimsOverviewPage = () => {
  const [claims, setClaims] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openNewClaimDialog, setOpenNewClaimDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // 2) Load claims from mock data instead of calling an API
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate fetch with a small delay if desired
    setTimeout(() => {
      getAllMockClaims()
        .then((data) => {
          setClaims(data);
        })
        .catch((err) => {
          console.error('Error fetching mock claims:', err);
          setError('Failed to load mock claims.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);
  }, []);

  // Open the dialog to add a new claim
  const handleAddNewClaim = () => {
    setSelectedClaim(null);
    setOpenNewClaimDialog(true);
  };

  /**
   * 3) Save the claim locally. 
   * If selectedClaim is set, we update. Otherwise, we create a new one. 
   */
  const handleSaveClaim = async (claimData) => {
    try {
      // If we are editing an existing claim
      if (selectedClaim) {
        const updated = await updateMockClaim(selectedClaim.claim_id, {
          ...claimData,
        });
        // Reflect changes in local state
        setClaims((prev) =>
          prev.map((c) =>
            c.claim_id === selectedClaim.claim_id ? updated : c
          )
        );
      } else {
        // Otherwise, create new
        const newClaim = await createMockClaim(claimData);
        setClaims((prev) => [newClaim, ...prev]);
      }
      setOpenNewClaimDialog(false);
      setSelectedClaim(null);
    } catch (err) {
      console.error('Error saving mock claim:', err);
      setError('Failed to save claim (mock).');
    }
  };

  // 4) Edit an existing claim (open the dialog prepopulated with claim data)
  const handleEditClaim = (claim) => {
    setSelectedClaim(claim);
    setOpenNewClaimDialog(true);
  };

  // 5) Delete a claim from local data
  const handleDeleteClaim = async (claim) => {
    if (window.confirm(`Are you sure you want to delete the claim "${claim.claim_name}"?`)) {
      try {
        await deleteMockClaim(claim.claim_id);
        setClaims((prevClaims) => prevClaims.filter((c) => c.claim_id !== claim.claim_id));
      } catch (err) {
        console.error('Error deleting mock claim:', err);
        setError('Failed to delete claim (mock).');
      }
    }
  };

  // Placeholder for viewing claim details
  const handleViewDetails = (claim) => {
    console.log('View details for claim (mock):', claim);
    // Could navigate to another page or open a detail modal
  };

  // Placeholder for adding conditions from the conditions list to a claim
  const handleAddConditionsToClaim = (claim) => {
    console.log('Add conditions to claim (mock):', claim);
    // Could open a dialog to select conditions
  };

  // Render loading or error states
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  // 6) Main claims overview UI
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        My Claims (Mock Data)
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={handleAddNewClaim}>
        Add New Claim
      </Button>

      <Grid container spacing={2}>
        {claims.map((claim) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={claim.claim_id}>
            <ClaimCard
              claim={claim}
              onEdit={handleEditClaim}
              onDelete={handleDeleteClaim}
              onViewDetails={handleViewDetails}
              onAddConditions={handleAddConditionsToClaim}
            />
          </Grid>
        ))}
      </Grid>

      {/* Dialog for creating/editing a claim */}
      <NewClaimDialog
        open={openNewClaimDialog}
        onClose={() => {
          setOpenNewClaimDialog(false);
          setSelectedClaim(null);
        }}
        onSave={handleSaveClaim}
        initialData={selectedClaim}
      />
    </Box>
  );
};

export default ClaimsOverviewPage;
