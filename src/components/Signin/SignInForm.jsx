//SignInForm.jsx

import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Card as MuiCard,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleIcon } from './CustomIcons'; // Only using GoogleIcon now.
import Logo from '../../assets/logo.png'; // Import the logo

const primaryBlue = '#051245';
const borderGray = '#9D9D9D';
const textGray = '#383838';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(3),
  borderRadius: '12px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : '#ffffff',
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
}));

export default function SignInForm(props) {
  const {
    formData,
    handleInputChange,
    errorMessages,
    loading,
    handleSubmit,
    open,
    handleClickOpen,
    handleClose,
    handleGoogleSuccess,
    handleGoogleFailure,
  } = props;

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={7}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 4 },
      }}
    >
      <Card variant="outlined" sx={{ maxWidth: 480, width: '100%' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={Logo} alt="ClaimGuard Logo" style={{ maxWidth: '150px', height: 'auto' }} />
        </Box>

        {/* Title */}
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: 'bold', color: primaryBlue, mb: 1, textAlign: 'center' }}
        >
          Welcome Back
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Email Input */}
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: textGray, fontWeight: '700', mb: 1 }}>
              Email Address
            </FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email Address"
              autoComplete="email"
              variant="outlined"
              error={!!errorMessages.email}
              helperText={errorMessages.email}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 8, borderColor: borderGray },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: borderGray },
              }}
            />
          </FormControl>

          {/* Password Input */}
          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: textGray, fontWeight: '700', mb: 1 }}>
              Password
            </FormLabel>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="***********"
              autoComplete="current-password"
              variant="outlined"
              error={!!errorMessages.password}
              helperText={errorMessages.password}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 8, borderColor: borderGray },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: borderGray },
              }}
            />
          </FormControl>

          {/* Display General Error Message */}
          {errorMessages.general && (
            <Typography
              sx={{
                color: 'red', // Error text color
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500',
                mt: 2, // Margin from the above element
              }}
            >
              {errorMessages.general}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>


        {/* Divider */}
        <Divider sx={{ my: 3 }}>
          <Typography sx={{ color: textGray, fontWeight: '700', fontSize: '14px' }}>
            or
          </Typography>
        </Divider>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          render={({ onClick, disabled }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 30px',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: `1px solid ${borderGray}`,
                cursor: 'pointer',
                '&:hover': { borderColor: primaryBlue },
              }}
              onClick={onClick}
              disabled={disabled || loading}
            >
              <GoogleIcon />
              <Typography
                sx={{ color: textGray, fontSize: '16px', fontWeight: '400', ml: 2 }}
              >
                Sign in with Google
              </Typography>
            </Box>
          )}
        />

        {/* Footer Text */}
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            textAlign: 'center',
            fontSize: '16px',
            color: primaryBlue,
            '& a': {
              color: '#303A65',
              fontWeight: '700',
              textDecoration: 'none',
            },
          }}
        >
          Don’t have an account?{' '}
          <Link href="/signup">Create an account</Link>
        </Typography>
      </Card>
    </Grid>
  );
}
