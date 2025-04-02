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
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleIcon } from './CustomIcons';
import Logo from '../../assets/logo.png';

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

export default function SignUpForm({
  signupData,
  handleInputChange,
  errorMessages,
  loading,
  handleSubmit,
  handleGoogleSuccess,
  handleGoogleFailure,
}) {
  const fields = [
    { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Enter your first name' },
    { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Enter your last name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email address' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••' },
  ];

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
          Create an Account
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
          {/* Map through fields */}
          {fields.map(({ label, name, type, placeholder }) => (
            <FormControl key={name}>
              <FormLabel htmlFor={name} sx={{ color: textGray, fontWeight: '700', mb: 1 }}>
                {label}
              </FormLabel>
              <TextField
                required
                fullWidth
                id={name}
                name={name}
                type={type}
                value={signupData[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                variant="outlined"
                error={!!errorMessages[name]}
                helperText={errorMessages[name]}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 8, borderColor: borderGray },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: borderGray },
                }}
              />
            </FormControl>
          ))}

          {/* Terms and Services */}
          <FormControlLabel
            control={<Checkbox sx={{ color: primaryBlue }} />}
            label="I agree with terms and services"
          />

          {/* General Errors */}
          {errorMessages.general && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }}>
          <Typography sx={{ color: textGray, fontWeight: '700', fontSize: '14px' }}>or</Typography>
        </Divider>

        {/* Google Signup */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          render={({ onClick, disabled }) => (
            <Button
              fullWidth
              variant="outlined"
              onClick={onClick}
              disabled={disabled || loading}
              startIcon={<GoogleIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 8,
                border: `1px solid ${borderGray}`,
                padding: '10px 20px',
                '&:hover': {
                  borderColor: primaryBlue,
                },
              }}
            >
              Sign up with Google
            </Button>
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
          Already have an account?{' '}
          <Link href="/signin">Sign in</Link>
        </Typography>
      </Card>
    </Grid>
  );
}
