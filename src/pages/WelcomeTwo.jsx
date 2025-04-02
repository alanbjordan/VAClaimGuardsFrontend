import React from 'react'
import { Box, Typography, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import welcomeBg from '../assets/welcome-bg.jpg';
import leftSide from '../assets/left-side.png';

export default function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/service-dates');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${welcomeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
      }}
    >
      <Card sx={{ maxWidth: 1000, backgroundColor: 'transparent', boxShadow: 'none' }} elevation={0}>
        <CardContent>
          <IconButton sx={{ position: 'absolute', top: 16, left: 16 }}>
            <ArrowBackIcon />
          </IconButton>
          <Grid container spacing={14} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={leftSide}
                alt="Illustration"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'General Sans',
                    color: '#1E2A54',
                    mt: 1
                  }}
                >
                  Your journey to a guided and more transparent VA disability claims experience starts here
                </Typography>
                <Card
                  sx={{
                    fontFamily: 'General Sans',
                    backgroundColor: '#E6E7EC',
                    boxShadow: 'none',
                    mt: 2,
                    p: 2,
                    borderRadius: 2
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'General Sans',
                      color: '#1E2A54',
                      mt: 1
                    }}
                  >
                    We’re here to help you navigate the VA claims process with clarity, 
                    precision, and unwavering support. Before we begin, we’d like to learn 
                    a bit about you. In the next step, you’ll share your name and service 
                    details so we can personalize your experience.
                  </Typography>
                </Card>
                <Typography
                  sx={{
                    fontFamily: 'General Sans',
                    color: '#B00020',
                    mt: 2,
                    fontSize: '0.875rem'
                  }}
                >
                  All information you provide is kept secure and confidential
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: 'General Sans',
                    mt: 3,
                    backgroundColor: '#1E2A54',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#162040' }
                  }}
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
