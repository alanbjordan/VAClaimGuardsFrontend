// src/components/Dashboard/ConditionLibrary/SearchBar.jsx
import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

function SearchBar({ onSearchChange, onFilterClick, onSortClick }) {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <TextField
        fullWidth
        placeholder="Search conditions..."
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} style={{ color: '#9CA3AF' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'navy.300',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'navy.300',
            },
          },
        }}
      />

      <Tooltip title="Filter Conditions" arrow>
        <IconButton
          onClick={onFilterClick}
          sx={{
            p: '8px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: 'surface.50',
            },
          }}
        >
          <SlidersHorizontal size={20} style={{ color: '#4B5563' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Sort Conditions A-Z or Z-A" arrow>
        <IconButton
          onClick={onSortClick}
          sx={{
            p: '8px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: 'surface.50',
            },
          }}
        >
          <ArrowUpDown size={20} style={{ color: '#4B5563' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default SearchBar;
