// src/pages/SavedDecisions.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import { ChevronRight } from 'lucide-react';

// Import the local mock function that returns all FIVE decisions
import { getSavedDecisionsMock } from '../data/mockSavedDecisions';

function SavedDecisions() {
  const [savedDecisions, setSavedDecisions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userUUID = localStorage.getItem('userUUID');

  useEffect(() => {
    // If no userUUID, show an error or redirect
    if (!userUUID) {
      setError('User UUID is missing. Please log in again.');
      return;
    }

    // Simulate fetching from local mock data
    async function fetchMockDecisions() {
      setIsLoading(true);
      try {
        const data = await getSavedDecisionsMock();
        setSavedDecisions(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching mock saved decisions:', err);
        setError('Failed to fetch saved decisions (mock).');
      } finally {
        setIsLoading(false);
      }
    }

    fetchMockDecisions();
  }, [userUUID]);

  const handleDecisionClick = (decision) => {
    // Encode decision URL & citation for the route
    const encodedUrl = encodeURIComponent(decision.decision_url);
    const encodedCitation = encodeURIComponent(decision.decision_citation);
    navigate(`/decision?url=${encodedUrl}&citation=${encodedCitation}`);
  };

  if (isLoading) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Error
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (savedDecisions.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          No Saved Decisions
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          You have not saved any decisions yet.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Saved Decisions (Mock)
      </Typography>
      <Paper variant="outlined">
        <List>
          {savedDecisions.map((decision) => (
            <ListItem
              key={decision.id}
              button
              onClick={() => handleDecisionClick(decision)}
            >
              <ListItemText
                primary={`Citation: ${decision.decision_citation}`}
                secondary={`Last Updated: ${new Date(decision.updated_at).toLocaleString()}`}
              />
              <IconButton edge="end">
                <ChevronRight />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default SavedDecisions;
