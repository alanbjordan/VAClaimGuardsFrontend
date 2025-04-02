// src/pages/StatementsPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 1) local mock data and functions
import { getMockTagsData, generateClaimSummary } from '../data/mockStatements';

export default function StatementsPage() {
  const navigate = useNavigate();

  // State for condition data
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // This holds the user’s current checkbox selections: { <tag_id>: [<condition_id>, ...], ... }
  const [selectedConditions, setSelectedConditions] = useState({});

  // 2) Simulate fetching condition data from local mocks
  const fetchConditions = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg('');

      // Instead of calling a real API, we call our mock function
      const data = await getMockTagsData();
      setTagsData(data);
    } catch (err) {
      console.error('Failed to fetch conditions (mock):', err);
      setError('Failed to fetch conditions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConditions();
  }, []);

  // 3) Handle check/uncheck of a single condition
  const handleCheckboxChange = (tagId, conditionId, isChecked) => {
    setSelectedConditions((prevSelected) => {
      const currentTagSelections = prevSelected[tagId] || [];
      let updatedTagSelections;
      if (isChecked) {
        // Add condition to this tag
        updatedTagSelections = [...currentTagSelections, conditionId];
      } else {
        // Remove condition from this tag
        updatedTagSelections = currentTagSelections.filter((id) => id !== conditionId);
      }

      return {
        ...prevSelected,
        [tagId]: updatedTagSelections,
      };
    });
  };

  // 4) Auto-select or deselect all conditions for a given tag
  const handleSelectAllForTag = (tag) => {
    const allConditionIds = tag.conditions.map((c) => c.condition_id);
    const currentSelections = selectedConditions[tag.tag_id] || [];
    const isAllSelected = allConditionIds.every((id) => currentSelections.includes(id));

    if (isAllSelected) {
      // Deselect all
      setSelectedConditions((prev) => ({
        ...prev,
        [tag.tag_id]: [],
      }));
    } else {
      // Select all
      setSelectedConditions((prev) => ({
        ...prev,
        [tag.tag_id]: allConditionIds,
      }));
    }
  };

  // 5) Generate the statement in memory
  const handleGenerateStatement = async () => {
    // Build an array for the selected conditions
    const tagsArray = Object.keys(selectedConditions).reduce((arr, tagIdStr) => {
      const conditionIds = selectedConditions[tagIdStr];
      if (conditionIds && conditionIds.length > 0) {
        arr.push({
          tag_id: parseInt(tagIdStr, 10),
          condition_ids: conditionIds,
        });
      }
      return arr;
    }, []);

    if (tagsArray.length === 0) {
      alert('Please select at least one condition to generate your statement.');
      return;
    }

    try {
      setSubmitLoading(true);
      setError(null);
      setSuccessMsg('');

      // In a real scenario, you’d pass userUUID or other data.
      // Here we just call our local mock `generateClaimSummary`.
      const response = await generateClaimSummary('fake-user-uuid', tagsArray);
      console.log('Statement generated (mock):', response);

      setSuccessMsg('Your Statement in Support of Claim has been generated (mock) and uploaded!');
    } catch (err) {
      console.error('Error generating statement (mock):', err);
      setError('Failed to generate statement. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // 6) Render states
  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchConditions}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box mt={4} px={2}>
      <Typography variant="h4" gutterBottom>
        Generate Statement in Support of Claim (Mock)
      </Typography>
      <Typography variant="body1" gutterBottom>
        Select the conditions you want to include in your Statement. Then click
        <strong> Generate Statement</strong>.
      </Typography>

      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMsg}
        </Alert>
      )}

      {tagsData.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No conditions found in mock data.
        </Typography>
      )}

      {tagsData.map((tag) => (
        <Card
          key={tag.tag_id}
          sx={{
            mt: 2,
            borderRadius: 2,
            boxShadow: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.02)' },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" gutterBottom>
                  {tag.tag_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tag.description}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                sx={{ textTransform: 'none', minWidth: '120px' }}
                onClick={() => handleSelectAllForTag(tag)}
              >
                {selectedConditions[tag.tag_id] &&
                selectedConditions[tag.tag_id].length === tag.conditions.length
                  ? 'Deselect All'
                  : 'Select All'}
              </Button>
            </Box>

            <Box mt={2}>
              {tag.conditions.map((condition) => {
                const isChecked =
                  selectedConditions[tag.tag_id]?.includes(condition.condition_id) || false;

                return (
                  <Box key={condition.condition_id} sx={{ ml: 2, mt: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={(e) =>
                              handleCheckboxChange(
                                tag.tag_id,
                                condition.condition_id,
                                e.target.checked
                              )
                            }
                            color="primary"
                          />
                        }
                        label={
                          <>
                            <strong>{condition.condition_name}</strong>
                            {condition.date_of_visit && ` (Visit: ${condition.date_of_visit})`}
                          </>
                        }
                      />
                    </FormGroup>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box mt={4} display="flex" flexWrap="wrap" alignItems="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateStatement}
          disabled={submitLoading}
          sx={{ textTransform: 'none', px: 3, py: 1.5 }}
        >
          {submitLoading ? 'Generating...' : 'Generate Statement'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/documents')}
          sx={{ textTransform: 'none', px: 3, py: 1.5 }}
        >
          View My Documents
        </Button>
      </Box>
    </Box>
  );
}
