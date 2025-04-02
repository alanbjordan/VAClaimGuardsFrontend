// SignUp.jsx
import React, { useState, useContext } from 'react';
import { Box, CssBaseline, CircularProgress, Grid } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import LeftPanel from '../components/SignUp/LeftPanel';
import SignUpForm from '../components/SignUp/SignUpForm';

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  // Minimal or dummy validation (optional)
  const validateInputs = () => {
    const errors = {};
    if (!signupData.firstName) errors.firstName = 'First name is required.';
    if (!signupData.lastName) errors.lastName = 'Last name is required.';
    if (!signupData.email || !/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!signupData.password || signupData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  // DUMMY Sign-up handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      // *********************************
      // DUMMY SIGNUP - No real backend call
      // *********************************
      // Store your "dummy" data in localStorage
      localStorage.setItem('userToken', 'dummy-access-token');
      localStorage.setItem('userUUID', 'dummy-uuid-1234'); // <-- Dummy UUID
      localStorage.setItem('first_name', signupData.firstName || '');
      localStorage.setItem('last_name', signupData.lastName || '');
      localStorage.setItem('email', signupData.email || '');
      localStorage.setItem('user_id', '123456'); // arbitrary ID

      // Mark user as authenticated
      setIsAuthenticated(true);

      // Navigate user to next step (onboarding/welcome) after sign-up
      navigate('/welcome', { replace: true });
    } catch (error) {
      // If anything goes wrong in your dummy logic, handle here
      setErrorMessages({ general: 'Dummy sign-up error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // DUMMY Google sign-up handlers (keep or remove as needed)
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      // Instead of calling a real endpoint:
      localStorage.setItem('userToken', 'dummy-google-access-token');
      localStorage.setItem('userUUID', 'dummy-google-uuid-7890'); // <-- Another dummy UUID
      localStorage.setItem('first_name', 'GoogleFirst');
      localStorage.setItem('last_name', 'GoogleLast');
      localStorage.setItem('email', 'dummy.google@example.com');
      localStorage.setItem('user_id', '789012'); // arbitrary ID

      setIsAuthenticated(true);

      // Navigate to onboarding or dashboard as you wish
      navigate('/welcome', { replace: true });
    } catch (error) {
      setErrorMessages({ general: 'Dummy Google sign-up error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setErrorMessages({ general: 'Unable to sign up with Google (dummy).' });
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
            <SignUpForm
              signupData={signupData}
              handleInputChange={handleInputChange}
              errorMessages={errorMessages}
              loading={loading}
              handleSubmit={handleSubmit}
              handleGoogleSuccess={handleGoogleSuccess}
              handleGoogleFailure={handleGoogleFailure}
            />
          </Grid>
        </Box>
      )}
    </GoogleOAuthProvider>
  );
}
