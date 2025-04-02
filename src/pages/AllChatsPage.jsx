// src/pages/AllChatsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  List,
  ListItem,
  Card,
  CardContent
} from '@mui/material';
import { Link } from 'react-router-dom';

// 1) Import your local mock function
import { getAllMockThreads } from '../data/mockChats';

const AllChatsPage = () => {
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2) Replace the real fetch call with local mock data
  useEffect(() => {
    const loadThreads = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // In a real scenario, you might check userToken or userUUID
        // For a mock approach, we just call our function:
        const data = await getAllMockThreads();
        setThreads(data);
      } catch (err) {
        console.error('Error fetching mock chat threads:', err);
        setError('Failed to load chat threads. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadThreads();
  }, []);

  // 3) Show loading or error states
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

  // 4) Render the list of mock threads
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        All Chats (Mock)
      </Typography>

      {threads.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6">You have no conversations yet.</Typography>
          <Typography variant="body2" color="text.secondary">
            Start a chat to discuss your VA claim!
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/chat">
            Start a New Chat
          </Button>
        </Box>
      ) : (
        <List>
          {threads.map((thread, index) => {
            // Convert the timestamp for display
            const createdOn = new Date(thread.created_at).toLocaleString();

            // Truncate preview if too long
            let preview = thread.first_message_preview || '';
            if (preview.length > 75) {
              preview = preview.substring(0, 75) + '...';
            }

            return (
              <ListItem key={thread.thread_id} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">{`Chat #${index + 1}`}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Created on: ${createdOn}`}
                    </Typography>

                    {preview && (
                      <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                        {preview}
                      </Typography>
                    )}

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Total Messages: {thread.messages_count}
                    </Typography>

                    <Box mt={2} textAlign="right">
                      <Button
                        variant="contained"
                        component={Link}
                        to="/chat"
                        state={{ fromExploreModal: false, threadId: thread.thread_id }}
                      >
                        Resume Chat
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default AllChatsPage;
