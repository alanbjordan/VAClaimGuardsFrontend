// ServiceDatesPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  Paper,
  Container,
} from '@mui/material';
import { Add as AddIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material';
// import axios from 'axios'; // <-- Remove or comment out if not needed
import { generateServicePeriodId } from '../utils/serviceUtils';
import Button from '../common/Button';
import Toast from '../common/Toast';
import ServicePeriodForm from '../components/Onboarding/ServicePeriodForm';
import DocumentUpload from '../components/Onboarding/DocumentUpload';

export default function ServiceDatesPage() {
  const navigate = useNavigate();
  const [userUuid, setUserUuid] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [formData, setFormData] = useState({
    servicePeriods: [
      {
        id: generateServicePeriodId(),
        branch: 'army',
        startDate: '',
        endDate: '',
      },
    ],
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const storedUserUuid = localStorage.getItem('userUUID') || '';

  useEffect(() => {
    if (storedUserUuid) {
      setUserUuid(storedUserUuid);
    } else {
      setErrors(['User not found. Please log in again.']);
    }
    setLoadingUser(false);
  }, [storedUserUuid]);

  const handleServicePeriodUpdate = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      servicePeriods: prev.servicePeriods.map((period) =>
        period.id === id ? { ...period, [field]: value } : period
      ),
    }));
  };

  const handleAddServicePeriod = () => {
    setFormData((prev) => ({
      ...prev,
      servicePeriods: [
        ...prev.servicePeriods,
        {
          id: generateServicePeriodId(),
          branch: 'army',
          startDate: '',
          endDate: '',
        },
      ],
    }));
  };

  const handleRemoveServicePeriod = (id) => {
    setFormData((prev) => ({
      ...prev,
      servicePeriods: prev.servicePeriods.filter((period) => period.id !== id),
    }));
  };

  const handleDocumentUpload = (files) => {
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...files],
    }));
  };

  const handleRemoveDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // Simple validation checks
  const validateForm = () => {
    const newErrors = [];

    formData.servicePeriods.forEach((period) => {
      if (!period.branch) {
        newErrors.push('Please select a branch of service for all periods.');
      }
      if (!period.startDate) {
        newErrors.push('Please enter a start date for all service periods.');
      }
      if (!period.endDate) {
        newErrors.push('Please enter an end date for all service periods.');
      }
      if (period.startDate && period.endDate && period.startDate > period.endDate) {
        newErrors.push('Start date must be before end date for all service periods.');
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // DUMMY handler to "save" service dates locally
  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!userUuid) {
      setErrors(['User not found. Please log in again.']);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      // ************************************
      // Instead of calling a real backend,
      // store the data in localStorage:
      // ************************************
      localStorage.setItem('servicePeriods', JSON.stringify(formData.servicePeriods));


      // Mimic successful save
      setShowToast(true);

      // Navigate to the next page after a short delay
      setTimeout(() => {
        navigate('/confirmation');
      }, 1000);
    } catch (error) {
      console.error('Error saving service information:', error);
      setErrors(['An error occurred while saving your information. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }} elevation={2}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
            Active Duty Service Periods
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Please provide information about your active duty service periods. You can add
            multiple periods if you served at different times or in different branches.
          </Typography>

          {errors.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="error" icon={<ErrorIcon fontSize="inherit" />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Please correct the following errors:
                </Typography>
                <List dense sx={{ pl: 2 }}>
                  {errors.map((error, index) => (
                    <ListItem
                      key={index}
                      sx={{ display: 'list-item', listStyleType: 'disc', pl: 2 }}
                    >
                      <Typography variant="body2">{error}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Alert>
            </Box>
          )}

          <Box sx={{ mb: 2 }}>
            {formData.servicePeriods.map((period) => (
              <ServicePeriodForm
                key={period.id}
                period={period}
                onUpdate={handleServicePeriodUpdate}
                onRemove={handleRemoveServicePeriod}
                showRemove={formData.servicePeriods.length > 1}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton
              onClick={handleAddServicePeriod}
              sx={{
                color: 'primary.main',
                '&:hover': { color: 'primary.dark' },
                mr: 1,
              }}
            >
              <AddIcon />
            </IconButton>
            <Typography variant="body2" sx={{ color: 'primary.main' }}>
              Add Another Service Period
            </Typography>
          </Box>

          {/* Document upload remains, but we won't send them to any backend */}
          <DocumentUpload
            files={formData.documents}
            onUpload={handleDocumentUpload}
            onRemove={handleRemoveDocument}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button onClick={handleSubmit} isLoading={isSubmitting}>
              Save and Continue
            </Button>
          </Box>
        </Paper>
      </Container>

      <Toast
        show={showToast}
        message="Service information saved successfully!"
        onClose={() => setShowToast(false)}
      />
    </Box>
  );
}
