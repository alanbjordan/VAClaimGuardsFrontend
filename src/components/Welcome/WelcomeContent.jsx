import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Shield, ChevronRight } from 'lucide-react';

export default function WelcomeContent({ onGetStarted }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        py: 12,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: '768px', // roughly equivalent to max-w-3xl
          width: '100%',
          borderRadius: 4, // 16px border radius
          p: { xs: 4, md: 8 }, // padding responsive
          textAlign: 'center',
        }}
      >
        {/* Shield Icon in a circle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              p: 4,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield style={{ width: '3rem', height: '3rem' }} color="#FFD700" />
          </Box>
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}
        >
          Welcome to VA ClaimGuard!
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{ color: 'text.secondary', mb: 4 }}
        >
          Your journey to a guided and more transparent VA disability claims experience
          starts here.
        </Typography>

        <Box
          sx={{
            bgcolor: 'background.default',
            borderRadius: 2,
            p: 3,
            mb: 6,
          }}
        >
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            We’re here to help you navigate the VA claims process with clarity,
            precision, and unwavering support. Before we begin, we’d like to learn
            a bit about you. In the next step, you’ll share your name and service
            details so we can personalize your experience.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={onGetStarted}
          endIcon={<ChevronRight />}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: '500',
            fontSize: '1rem',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Get Started
        </Button>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 3 }}>
          All information you provide is kept secure and confidential.
        </Typography>
      </Paper>
    </Box>
  );
}
