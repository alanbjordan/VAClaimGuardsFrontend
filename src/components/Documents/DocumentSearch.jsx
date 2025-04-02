// DocumentSearch component for searching documents and toggling filters

import React from 'react';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

export function DocumentSearch({
  query,
  onQueryChange,
  onSearch,
  onToggleFilters,
}) {
  return (
    <Box display="flex" gap={2} mb={3}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search documents..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size={20} style={{ color: '#9CA3AF' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: 'background.paper',
        }}
      />

      <Button
        variant="outlined"
        onClick={onToggleFilters}
        startIcon={<SlidersHorizontal size={20} />}
        sx={{
          textTransform: 'none',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderColor: 'grey.200',
          '&:hover': {
            backgroundColor: 'grey.100',
          },
        }}
      >
        Filters
      </Button>
    </Box>
  );
}
