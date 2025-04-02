// pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Stack } from '@mui/material';
// import axios from 'axios'; // <-- Comment out or remove if not needed
import Updates from '../components/Dashboard/Updates.jsx';
import TrustBanner from '../components/Dashboard/TrustBanner.jsx';

// 1) Define some fake "feedUpdates" data for display
const MOCK_FEED_UPDATES = [
  {
    nexus_tags_id: 'tag1',
    disability_name: 'Back Pain',
    discovered_at: '2023-02-12T13:45:00Z',
    conditions: [
      {
        condition_name: 'Chronic Lower Back Pain',
        date_of_visit: '2022-08-01',
        in_service: true,
        medical_professionals: 'Dr. Smith (PT)',
        findings: 'MRI reveals slight disc bulge.',
        treatments: 'Physical therapy, pain management',
      },
    ],
  },
  {
    nexus_tags_id: 'tag2',
    disability_name: 'Anxiety',
    discovered_at: '2023-04-15T09:30:00Z',
    conditions: [
      {
        condition_name: 'Generalized Anxiety Disorder',
        date_of_visit: '2023-04-01',
        in_service: false,
        medical_professionals: 'Dr. Johnson (Psychologist)',
        findings: 'Meets DSM-5 Criteria for GAD',
        treatments: 'Therapy, Medication',
      },
    ],
  },
  {
    nexus_tags_id: 'tag3',
    disability_name: 'Knee Injury',
    discovered_at: '2023-05-20T11:00:00Z',
    conditions: [
      {
        condition_name: 'Left Knee Pain',
        date_of_visit: '2023-05-10',
        in_service: true,
        medical_professionals: 'Dr. Green (Orthopedic)',
        findings: 'Possible meniscus tear',
        treatments: 'Surgery consultation recommended',
      },
    ],
  },
];

const Dashboard = () => {
  // Local state for feed updates and loading
  const [feedUpdates, setFeedUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch summary data (initially we "fake" this call)
  useEffect(() => {
    setIsLoading(true);
    // Simulate a short delay as if fetching from server
    const timer = setTimeout(() => {
      setFeedUpdates(MOCK_FEED_UPDATES);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // If you want "View All" to display the same data,
  // or you can define a bigger array for full data.
  const fetchFullData = useCallback(() => {
    // Example: Just set the same data, or define a bigger array
    setFeedUpdates(MOCK_FEED_UPDATES);
  }, []);

  return (
    <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
      <Grid item xs={12}>
        <Stack spacing={3}>
          {/* Sample banner, or remove if not needed */}
          <TrustBanner />

          {/* Pass  updates and loading to the Updates component */}
          <Updates
            updates={feedUpdates}
            isLoading={isLoading}
            onViewAll={fetchFullData}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
