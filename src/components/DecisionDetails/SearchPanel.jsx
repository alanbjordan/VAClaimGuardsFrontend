// SearchPanel.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Stack
} from '@mui/material';
import { Search, ArrowUp, ArrowDown, X } from 'lucide-react';

export function SearchPanel({ query, onSearch, resultCount, currentMatch, onNavigate }) {
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearch = () => {
    // Call the parent's onSearch with the current local query
    onSearch(localQuery);
  };

  const handleNext = () => {
    // Go to the next match (wrap around using modulo)
    onNavigate((currentMatch + 1) % resultCount);
  };

  const handlePrevious = () => {
    // Go to the previous match (wrap around using modulo)
    onNavigate((currentMatch - 1 + resultCount) % resultCount);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ flex: 1, position: 'relative' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          // When the user presses Enter, trigger handleSearch
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Search in decision..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} style={{ color: 'rgba(0,0,0,0.54)' }} />
              </InputAdornment>
            ),
            // Show an 'X' icon to clear the field if there's a query
            endAdornment: localQuery ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setLocalQuery('');
                    onSearch(''); // Clear highlights if user clears the field
                  }}
                >
                  <X size={16} />
                </IconButton>
              </InputAdornment>
            ) : null
          }}
        />
      </Box>

      {/* Only show match count and arrows if we have at least one match */}
      {resultCount > 0 && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {currentMatch + 1} of {resultCount}
          </Typography>
          <IconButton
            size="small"
            onClick={handlePrevious}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', backgroundColor: 'grey.100' }
            }}
          >
            <ArrowUp size={16} />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNext}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary', backgroundColor: 'grey.100' }
            }}
          >
            <ArrowDown size={16} />
          </IconButton>
        </Stack>
      )}
    </Paper>
  );
}

SearchPanel.propTypes = {
  // Current search term from the parent
  query: PropTypes.string.isRequired,
  // Callback to trigger a new search
  onSearch: PropTypes.func.isRequired,
  // Total number of matched occurrences in the text
  resultCount: PropTypes.number.isRequired,
  // Index of the currently highlighted match
  currentMatch: PropTypes.number.isRequired,
  // Callback to navigate matches (next/previous)
  onNavigate: PropTypes.func.isRequired,
};
