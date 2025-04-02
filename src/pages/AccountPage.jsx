// AccountPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  Divider,
} from '@mui/material';
import SupportModal from '../components/Sidebar/SupportModal';

// Example base URL from your .env or config
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://website.azurewebsites.net'; dummy url

function AccountPage() {
  // -- User info state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // -- Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // -- Support modal state
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportIssueType, setSupportIssueType] = useState('general');

  // Subscription plan data
  const plans = [
    {
      title: 'Basic',
      price: '$25',
      features: ['All features', '1,000,000 tokens per month', 'Normal support'],
    },
    {
      title: 'Pro',
      price: '$50',
      features: ['All features', '3,000,000 tokens per month', 'Premium support'],
      current: true,
    },
    {
      title: 'Enterprise',
      price: 'Contact Us',
      features: ['All features', 'Custom usage limits', 'Dedicated support'],
    },
  ];

  // Grab userUUID from local storage (or however you store it)
  const userUUID = localStorage.getItem('userUUID');

  // --- Fetch user info on mount ---
  useEffect(() => {
    if (!userUUID) {
      console.error('No userUUID in localStorage');
      return;
    }

    fetch(`${API_BASE_URL}/me?userUUID=${userUUID}`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user info');
        }
        return res.json();
      })
      .then((data) => {
        setFirstName(data.first_name || '');
        setLastName(data.last_name || '');
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userUUID]);

  // --- Handle saving first/last name ---
  const handleSavePersonalInfo = () => {
    if (!userUUID) return;

    fetch(`${API_BASE_URL}/me?userUUID=${userUUID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update user info');
        }
        return res.json();
      })
      .then(() => {
        alert('Personal info updated successfully');
      })
      .catch((err) => {
        console.error(err);
        alert('Error updating personal info');
      });
  };

  // --- Handle updating password ---
  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    if (!userUUID) return;

    fetch(`${API_BASE_URL}/me/password?userUUID=${userUUID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update password');
        }
        return res.json();
      })
      .then(() => {
        alert('Password updated successfully');
        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((err) => {
        console.error(err);
        alert('Error updating password');
      });
  };

  // --- Support Modal logic ---
  const handleOpenSupport = (issueType) => {
    setSupportIssueType(issueType);
    setSupportOpen(true);
  };
  const handleCloseSupport = () => setSupportOpen(false);

  return (
    <>
      <Box sx={{ px: 4, py: 4 }}>
        {/* Personal Information */}
        <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 6, p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#051245', mb: 4 }}>
            Personal Information
          </Typography>

          {/* Avatar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 160,
                height: 160,
                border: '4px solid #9D9D9D',
                backgroundColor: '#F5F6F6',
              }}
            >
              <Typography variant="h4" color="text.secondary">
                {firstName ? firstName[0] : 'A'}
              </Typography>
            </Avatar>
          </Box>

          {/* First/Last name fields */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 4,
            }}
          >
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {/* For now, ignoring Start/End Date & Branch of Service */}
            <TextField
              label="Start Date"
              variant="outlined"
              fullWidth
              placeholder="dd/mm/yy"
            />
            <TextField
              label="End Date"
              variant="outlined"
              fullWidth
              placeholder="dd/mm/yy"
            />
            <TextField
              label="Branch of Service"
              variant="outlined"
              fullWidth
              placeholder="Select your service"
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#051245', color: 'white', px: 4 }}
              onClick={handleSavePersonalInfo}
            >
              Save Changes
            </Button>
          </Box>
        </Card>

        {/* Subscription Plan */}
        <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 6, p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#051245', mb: 4 }}>
            Subscription Plan
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gap: 4,
            }}
          >
            {plans.map((plan, index) => {
              const isEnterprise = plan.title === 'Enterprise';
              const isCurrentPlan = !!plan.current;

              return (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 2,
                    backgroundColor: isCurrentPlan ? '#303A65' : 'white',
                    color: isCurrentPlan ? 'white' : 'inherit',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    {plan.title}
                  </Typography>

                  {/* Price */}
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, display: 'inline' }}>
                      {plan.price}
                    </Typography>
                    {/* Hide "/monthly" if Enterprise */}
                    {!isEnterprise && (
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 1, fontWeight: 400 }}
                      >
                        /monthly
                      </Typography>
                    )}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Features */}
                  <Box sx={{ mb: 2 }}>
                    {plan.features.map((feature, idx) => (
                      <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                        - {feature}
                      </Typography>
                    ))}
                  </Box>

                  {/* Action Button */}
                  <Button
                    variant={isCurrentPlan ? 'contained' : 'outlined'}
                    sx={{
                      backgroundColor: isCurrentPlan ? 'white' : 'inherit',
                      color: isCurrentPlan ? '#303A65' : 'inherit',
                    }}
                    onClick={
                      isEnterprise
                        ? () => handleOpenSupport('enterprise-request')
                        : undefined
                    }
                  >
                    {isEnterprise
                      ? 'Contact'
                      : isCurrentPlan
                      ? 'Current Plan'
                      : 'Update'}
                  </Button>
                </Card>
              );
            })}
          </Box>
        </Card>

        {/* Password Management */}
        <Card sx={{ borderRadius: 3, boxShadow: 3, p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#051245', mb: 4 }}>
            Password Management
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 4 }}>
            <TextField
              label="Current Password"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#051245', color: 'white', px: 4 }}
              onClick={handleUpdatePassword}
            >
              Save Changes
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Support Modal (uses the custom initialIssueType) */}
      <SupportModal
        open={supportOpen}
        onClose={handleCloseSupport}
        initialIssueType={supportIssueType}
      />
    </>
  );
}

export default AccountPage;
