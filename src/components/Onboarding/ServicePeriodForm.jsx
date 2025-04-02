// ServicePeriodForm.jsx is a component that displays a form for a single service period. It allows the user to select a branch of service, start date, and end date. The user can also remove the service period if needed. The component is used in the ServicePeriodsForm component.

import React from 'react';
import { Box, Typography, IconButton, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { SERVICE_BRANCHES } from '../../utils/serviceUtils';

export default function ServicePeriodForm({ 
  period, 
  onUpdate, 
  onRemove,
  showRemove 
}) {
  const handleBranchChange = (e) => onUpdate(period.id, 'branch', e.target.value);
  const handleStartDateChange = (e) => onUpdate(period.id, 'startDate', e.target.value);
  const handleEndDateChange = (e) => onUpdate(period.id, 'endDate', e.target.value);

  return (
    <Paper sx={{ p: 3, mb: 4, position: 'relative' }} elevation={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Service Period
        </Typography>
        {showRemove && (
          <IconButton
            aria-label="Remove service period"
            onClick={() => onRemove(period.id)}
            sx={{ color: 'text.secondary' }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id={`branch-label-${period.id}`}>Branch of Service</InputLabel>
          <Select
            labelId={`branch-label-${period.id}`}
            label="Branch of Service"
            value={period.branch || ''}
            onChange={handleBranchChange}
          >
            <MenuItem value="">Select branch...</MenuItem>
            {SERVICE_BRANCHES.map((branch) => (
              <MenuItem key={branch.value} value={branch.value}>
                {branch.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={period.startDate}
            onChange={handleStartDateChange}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={period.endDate}
            onChange={handleEndDateChange}
          />
        </Box>
      </Box>
    </Paper>
  );
}
