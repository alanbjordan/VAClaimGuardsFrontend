// DocumentFilters component for filtering documents by categories, status, date range, and tags.

import React from 'react';
import { Box, Typography, Button, TextField, Chip, Stack } from '@mui/material';
import { Filter } from 'lucide-react';

export function DocumentFilters({
  categories,
  status,
  dateRange,
  tags,
  onCategoriesChange,
  onStatusChange,
  onDateRangeChange,
  onTagsChange,
  onReset
}) {
  // Define the available categories and statuses (could be moved to a constants file).
  const allCategories = ['medical', 'financial', 'legal', 'personal', 'other'];
  const allStatuses = ['pending', 'approved', 'rejected', 'expired'];

  const handleCategoryToggle = (cat) => {
    const newCategories = categories.includes(cat)
      ? categories.filter(c => c !== cat)
      : [...categories, cat];
    onCategoriesChange(newCategories);
  };

  const handleStatusToggle = (stat) => {
    const newStatus = status.includes(stat)
      ? status.filter(s => s !== stat)
      : [...status, stat];
    onStatusChange(newStatus);
  };

  const handleDateChange = (key, value) => {
    if (!value) {
      // If date is cleared, reset the entire range.
      onDateRangeChange(null);
      return;
    }

    const newRange = {
      start: dateRange?.start || value,
      end: dateRange?.end || value,
    };

    newRange[key] = value;
    onDateRangeChange(newRange);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 3,
        boxShadow: 1,
        border: '1px solid',
        borderColor: 'grey.100',
        mb: 4
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Filter size={20} style={{ color: '#666' }} />
          <Typography variant="h6" color="text.primary">
            Filters
          </Typography>
        </Box>
        <Button
          onClick={onReset}
          variant="text"
          sx={{
            textTransform: 'none',
            fontSize: '0.875rem',
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' }
          }}
        >
          Reset All
        </Button>
      </Box>

      {/* Categories */}
      <Box mb={2}>
        <Typography variant="subtitle2" color="text.primary" mb={1}>
          Categories
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {allCategories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => handleCategoryToggle(cat)}
              color={categories.includes(cat) ? 'primary' : 'default'}
              variant={categories.includes(cat) ? 'filled' : 'outlined'}
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      </Box>

      {/* Status */}
      <Box mb={2}>
        <Typography variant="subtitle2" color="text.primary" mb={1}>
          Status
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {allStatuses.map((stat) => (
            <Chip
              key={stat}
              label={stat}
              onClick={() => handleStatusToggle(stat)}
              color={status.includes(stat) ? 'secondary' : 'default'}
              variant={status.includes(stat) ? 'filled' : 'outlined'}
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      </Box>

      {/* Date Range */}
      <Box mb={2}>
        <Typography variant="subtitle2" color="text.primary" mb={1}>
          Date Range
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            type="date"
            value={dateRange?.start || ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            type="date"
            value={dateRange?.end || ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Stack>
      </Box>
    </Box>
  );
}
