import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button'; // The MUI-based button

export default function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6, px: 2 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', borderRadius: 2 }} elevation={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{
              bgcolor: '#688E26', 
              p: 2, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <CheckCircle style={{ width: '3rem', height: '3rem', color: '#FFFFFF' }} />
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            Information Saved Successfully!
          </Typography>

          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
            Your service information has been securely saved. You can now proceed to your
            personalized dashboard where you can begin your VA claims journey.
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.disabled', mb: 4 }}>
            Don&apos;t worry - you can review and update your service information at any time
            from your account settings.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'center' } }}>
            <Button
              icon={<ArrowRight />}
              onClick={() => navigate('/dashboard')}
              sx={{
                width: { xs: '100%', md: 'auto' },
                textTransform: 'none'
              }}
            >
              Proceed to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
