// SignIn.jsx
import React, { useState, useContext } from 'react';
import { Box, CssBaseline, CircularProgress, Grid } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import axios from 'axios';  // <-- Remove or comment out if not used
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LeftPanel from '../components/Signin/LeftPanel';
import SignInForm from '../components/Signin/SignInForm';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Destructure from AuthContext
  const { isAuthenticated, setIsAuthenticated, updateCredits } = useContext(AuthContext);
  const navigate = useNavigate();

  // If user is already authenticated, show a spinner
  if (isAuthenticated) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <CircularProgress size={80} />
        </Box>
      </>
    );
  }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const validateInputs = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Please enter an email (dummy-only check).';
    }
    if (!formData.password) {
      errors.password = 'Please enter a password (dummy-only check).';
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  // DUMMY Login handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try {
      // ************
      // DUMMY LOGIN
      // ************
      // Instead of calling the backend, we simply set the user as authenticated:
      localStorage.setItem('userToken', 'dummy-access-token');
      localStorage.setItem('refreshToken', 'dummy-refresh-token');
      localStorage.setItem('email', formData.email);

      // If you want to store or update dummy credits:
      localStorage.setItem('creditsRemaining', '999');
      updateCredits(999);

      setIsAuthenticated(true);

      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrorMessages({ general: 'Unexpected error (dummy).' });
    } finally {
      setLoading(false);
    }
  };

  // DUMMY Google handlers 
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      // Dummy approach: skip any real calls
      localStorage.setItem('userToken', 'dummy-google-access-token');
      localStorage.setItem('refreshToken', 'dummy-google-refresh-token');
      localStorage.setItem('creditsRemaining', '999');
      updateCredits(999);

      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrorMessages({ general: 'Google login failed (dummy).' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setErrorMessages({ general: 'Unable to sign in with Google (dummy).' });
  };

  return (
    <GoogleOAuthProvider clientId="DUMMY_GOOGLE_CLIENT_ID">
      <CssBaseline />
      {loading ? (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Box sx={{ minHeight: '100vh', position: 'relative' }}>
          <Grid container sx={{ minHeight: '100vh' }}>
            <LeftPanel />
            <SignInForm
              formData={formData}
              handleInputChange={handleInputChange}
              errorMessages={errorMessages}
              loading={loading}
              handleSubmit={handleSubmit}
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              handleGoogleSuccess={handleGoogleSuccess}
              handleGoogleFailure={handleGoogleFailure}
            />
          </Grid>
        </Box>
      )}
    </GoogleOAuthProvider>
  );
}
