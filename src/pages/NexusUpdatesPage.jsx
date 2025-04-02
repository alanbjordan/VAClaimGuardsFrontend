// NexusUpdatesPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Skeleton,
  Paper,
} from '@mui/material';
// import axios from 'axios'; // <-- No longer needed if we’re just using mock data
import UpdateCard from '../components/Dashboard/Updates/UpdateCard';
import ExploreModal from '../components/Dashboard/Updates/ExploreModal';

// ----- MOCK DATA -----
// Adjust to match the shape your UI needs (e.g., nexus_tags_id, discovered_at, conditions, etc.)
const MOCK_UPDATES = [
  {
    nexus_tags_id: 'fakeTag1',
    disability_name: 'Knee Pain',
    discovered_at: '2024-01-02T10:30:00Z',
    conditions: [
      {
        condition_name: 'Chronic knee condition',
        in_service: true,
        date_of_visit: '2024-01-01',
        medical_professionals: 'Dr. Smith',
        findings: 'Inflammation and cartilage damage',
        treatments: 'Physical therapy, medication',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag2',
    disability_name: 'Shoulder Injury',
    discovered_at: '2024-02-10T09:15:00Z',
    conditions: [
      {
        condition_name: 'Torn Rotator Cuff',
        in_service: false,
        date_of_visit: '2024-02-02',
        medical_professionals: 'Dr. Adams',
        findings: 'Partial tear in left shoulder',
        treatments: 'Surgery, rehab exercises',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag3',
    disability_name: 'Hearing Loss',
    discovered_at: '2024-03-01T11:42:00Z',
    conditions: [
      {
        condition_name: 'Bilateral hearing decline',
        in_service: true,
        date_of_visit: '2024-02-25',
        medical_professionals: 'Audiologist Dr. Green',
        findings: 'High-frequency hearing deficit',
        treatments: 'Hearing aids recommended',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag4',
    disability_name: 'Back Pain',
    discovered_at: '2024-03-15T14:00:00Z',
    conditions: [
      {
        condition_name: 'Chronic lower back pain',
        in_service: false,
        date_of_visit: '2024-03-10',
        medical_professionals: 'Chiropractor Dr. Lee',
        findings: 'Lumbar strain, sciatica symptoms',
        treatments: 'Physical therapy, chiropractic',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag5',
    disability_name: 'Migraines',
    discovered_at: '2024-04-01T08:20:00Z',
    conditions: [
      {
        condition_name: 'Recurring migraines',
        in_service: true,
        date_of_visit: '2024-03-28',
        medical_professionals: 'Neurologist Dr. Clark',
        findings: 'Throbbing headache, light sensitivity',
        treatments: 'Medication, lifestyle adjustments',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag6',
    disability_name: 'Depression',
    discovered_at: '2024-04-15T12:00:00Z',
    conditions: [
      {
        condition_name: 'Major depressive disorder',
        in_service: true,
        date_of_visit: '2024-04-10',
        medical_professionals: 'Psychiatrist Dr. Brown',
        findings: 'Symptoms of persistent sadness, fatigue',
        treatments: 'Therapy, antidepressants',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag7',
    disability_name: 'Anxiety',
    discovered_at: '2024-04-20T16:30:00Z',
    conditions: [
      {
        condition_name: 'Generalized anxiety disorder',
        in_service: false,
        date_of_visit: '2024-04-18',
        medical_professionals: 'Psychologist Dr. Davis',
        findings: 'Excessive worry, restlessness',
        treatments: 'Cognitive Behavioral Therapy (CBT)',
      },
    ],
  },
  {
    nexus_tags_id: 'fakeTag8',
    disability_name: 'Tinnitus',
    discovered_at: '2024-05-02T13:15:00Z',
    conditions: [
      {
        condition_name: 'Ringing in the ears',
        in_service: true,
        date_of_visit: '2024-04-30',
        medical_professionals: 'Audiologist Dr. White',
        findings: 'Chronic ringing at high pitch',
        treatments: 'Sound therapy, masking devices',
      },
    ],
  },
];

// Number of items per "page"
const LIMIT = 3;

export default function NexusUpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // We'll track the current offset manually
  const offsetRef = useRef(0);

  // Modal state for exploring a single update
  const [openModal, setOpenModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  // Called when the "Explore Connection" button is clicked in UpdateCard
  const handleExplore = (update) => {
    setSelectedUpdate(update);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUpdate(null);
    setOpenModal(false);
  };

  // Simulate async fetch of the next "page" of updates
  const fetchUpdates = () => {
    setIsLoading(true);

    // Simulate a delay, e.g. 700ms
    setTimeout(() => {
      // Grab a chunk of mock data from offset to offset + LIMIT
      const start = offsetRef.current;
      const end = offsetRef.current + LIMIT;
      const newData = MOCK_UPDATES.slice(start, end);

      // Update offset
      offsetRef.current += LIMIT;

      // Append the new data
      setUpdates((prev) => [...prev, ...newData]);

      // If no more data to slice, set hasMore to false
      if (end >= MOCK_UPDATES.length) {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 700);
  };

  // Initial load on mount
  useEffect(() => {
    fetchUpdates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* Page Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Nexus Updates
        </Typography>
      </Box>

      {/* Render Update Cards */}
      {updates.map((update) => (
        <UpdateCard
          key={update.nexus_tags_id}
          update={update}
          onExplore={handleExplore}
        />
      ))}

      {/* Loading Skeletons */}
      {isLoading && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            backgroundColor: '#fff',
          }}
        >
          <Skeleton variant="rectangular" height={80} sx={{ mb: 2, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 1 }} />
        </Paper>
      )}

      {/* "View More" Button */}
      {hasMore && !isLoading && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={fetchUpdates}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
            }}
          >
            View More
          </Button>
        </Box>
      )}

      {/* No More Updates Message */}
      {!hasMore && !isLoading && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          No more updates.
        </Typography>
      )}

      {/* Single-update ExploreModal */}
      <ExploreModal open={openModal} onClose={handleCloseModal} selectedUpdate={selectedUpdate} />
    </Container>
  );
}
