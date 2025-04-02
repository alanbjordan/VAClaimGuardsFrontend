// src/components/Dashboard/ConditionLibrary/FilterModal.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Box } from '@mui/material';

function FilterModal({ open, currentStatus, startDate, endDate, onApply, onCancel }) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  const handleApply = () => {
    onApply(selectedStatus, tempStartDate, tempEndDate);
  };

  const handleClear = () => {
    // Reset to default filters
    setSelectedStatus("all");
    setTempStartDate("");
    setTempEndDate("");
    // After clearing, immediately apply to reflect changes and close
    onApply("all", "", "");
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: 'primary.dark' }}>
        Filter Conditions
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          By Status
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="in-service" control={<Radio />} label="In-Service" />
            <FormControlLabel value="current" control={<Radio />} label="Current" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            By Date Range
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Start Date (YYYY-MM-DD)"
              variant="outlined"
              value={tempStartDate}
              onChange={(e) => setTempStartDate(e.target.value)}
            />
            <TextField
              label="End Date (YYYY-MM-DD)"
              variant="outlined"
              value={tempEndDate}
              onChange={(e) => setTempEndDate(e.target.value)}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Leave date fields empty to ignore date filtering.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button variant="text" onClick={handleClear} sx={{ textTransform: 'none', color: 'warning.main' }}>
          Clear
        </Button>
        <Button variant="contained" onClick={handleApply} sx={{ textTransform: 'none' }}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterModal;
