// SearchFilters.jsx is a functional component that renders search filters for refining search results. It receives props for advancedQuery, includeSynonyms, onAdvancedQueryChange, onSynonymsChange, onReset, and onApply. The search filters allow users to enter additional keywords or phrases, include synonym expansions, reset the filters, and apply the filters to the search results.

import React from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

export function SearchFilters({
  advancedQuery,
  includeSynonyms,
  onAdvancedQueryChange,
  onSynonymsChange,
  onReset,
  onApply,
}) {
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
      {/* Filters Header */}
      <Typography variant="h6" color="text.primary" sx={{ marginBottom: 2 }}>
        Refine Your Search
      </Typography>

      {/* Advanced Query Input */}
      <TextField
        label="Additional Keywords or Phrases"
        value={advancedQuery}
        onChange={(e) => onAdvancedQueryChange(e.target.value)}
        fullWidth
        placeholder="Enter additional terms..."
        variant="outlined"
        sx={{
          marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              boxShadow: `0 0 4px ${'#001F54'}`,
            },
          },
        }}
      />

      {/* Synonyms Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={includeSynonyms}
            onChange={(e) => onSynonymsChange(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" color="text.primary">
            Include synonym expansions
          </Typography>
        }
        sx={{
          marginBottom: 2,
        }}
      />

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          marginTop: 2,
        }}
      >
        <Button
          onClick={onReset}
          variant="outlined"
          color="secondary"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            color: 'text.primary',
          }}
        >
          Reset
        </Button>
        <Button
          onClick={onApply}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}
