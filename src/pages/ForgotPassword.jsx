import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../assets/logo.png'; // Import the logo

const primaryBlue = '#051245';
const borderGray = '#9D9D9D';
const textGray = '#383838';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 480,
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : '#ffffff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
}));

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendResetLink = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Reset link has been sent to your email address.');
      }, 1500);
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to send reset link. Please try again.');
    }
  };

  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 2, // Add padding to prevent card from being too close to the edges on small screens
      }}
    >
      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={Logo} alt="ClaimGuard Logo" style={{ maxWidth: '150px', height: 'auto' }} />
        </Box>
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: 'bold', color: primaryBlue }}
          >
            Forgot Password
          </Typography>
          <Typography
            sx={{
              color: textGray,
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '28px',
              mt: 1,
            }}
          >
            A link will be sent to your registered email to reset your password.
          </Typography>
        </Box>

        {/* Input */}
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Enter your Email Address"
          variant="outlined"
          error={!!errorMessage}
          helperText={errorMessage}
          sx={{
            '& .MuiOutlinedInput-root': { borderRadius: 8, borderColor: borderGray },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: borderGray },
          }}
        />

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSendResetLink}
            disabled={loading}
            sx={{
              textTransform: 'none',
              borderRadius: 8,
              backgroundColor: primaryBlue,
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              height: 48,
              '&:hover': { backgroundColor: '#303A65' },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoBack}
            sx={{
              textTransform: 'none',
              borderRadius: 8,
              border: `1px solid ${textGray}`,
              color: textGray,
              fontWeight: '700',
              fontSize: '16px',
              height: 48,
              '&:hover': { borderColor: primaryBlue, color: primaryBlue },
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Success Message */}
        {successMessage && (
          <Typography
            variant="body2"
            color="success.main"
            sx={{ mt: 3, textAlign: 'center' }}
          >
            {successMessage}
          </Typography>
        )}
      </Card>
    </Box>
  );
}
