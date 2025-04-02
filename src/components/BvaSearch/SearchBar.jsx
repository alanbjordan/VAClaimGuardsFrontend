//SearchBar.jsx is a functional component that renders a search bar with a text field, search button, and filters button. It receives props for the query, onQueryChange, onSearch, onToggleFilters, and isLoading. The search bar allows users to enter keywords or phrases to search for BVA decisions. The search button triggers the search action, and the filters button toggles the display of search filters.

import React from 'react';
import { TextField, Box, Button, Typography, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export function SearchBar({ query, onQueryChange, onSearch, onToggleFilters, isLoading }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 1,
        border: '1px solid',
        borderColor: 'surface.200',
        padding: 3,
        marginBottom: 3,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        <SearchIcon sx={{ fontSize: 32, color: 'text.secondary', marginBottom: 1 }} />
        <Typography variant="h6" color="text.primary">
          Search BVA Decisions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter keywords or phrases to begin your search
        </Typography>
      </Box>

      {/* Input and Buttons Section */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        {/* Input Field */}
        <TextField
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter keywords or phrases..."
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', marginRight: 1 }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: 'background.paper',
              transition: 'all 0.3s',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                boxShadow: `0 0 4px ${'#001F54'}`,
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'surface.200',
            },
          }}
        />

        {/* Search Button */}
        <Button
          onClick={onSearch}
          disabled={isLoading}
          variant="contained"
          color="primary"
          sx={{
            paddingX: 3,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Search'}
        </Button>

        {/* Filters Button 
        <IconButton
          onClick={onToggleFilters}
          sx={{
            padding: 1,
            backgroundColor: 'surface.50',
            border: '1px solid',
            borderColor: 'surface.200',
            color: 'text.secondary',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'surface.100',
            },
          }}
        >
          <FilterListIcon />
        </IconButton>*/}
      </Box>
    </Box>
  );
}
