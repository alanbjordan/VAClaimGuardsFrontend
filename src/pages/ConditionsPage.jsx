// src/pages/ConditionsPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import ConditionLibrary from '../components/Dashboard/ConditionLibrary.jsx';

// Import your fake data here
import { conditions as mockConditions } from '../data/mockData';

const ConditionsPage = () => {
  const [conditions, setConditions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Removed the API_URL and any actual fetch calls

  useEffect(() => {
    // Simulate an async fetch or loading time (optional)
    setTimeout(() => {
      try {
        // We simply "load" from the mock array
        const fetchedConditions = mockConditions;

        // Optional: transform or map the data if needed
        // e.g., if ConditionLibrary expects certain properties
        // const transformed = fetchedConditions.map((cond) => ({
        //   ...cond,
        //   customProp: ...
        // }));

        // Set the state
        setConditions(fetchedConditions);
        setError(null);
      } catch (err) {
        console.error('Error loading mock data:', err);
        setError('Failed to load conditions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }, 600); // 0.6s delay for effect
  }, []);

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

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        My Conditions
      </Typography>

      <ConditionLibrary conditions={conditions} />
    </Box>
  );
};

export default ConditionsPage;
