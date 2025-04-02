// HighlightToolbar.jsx is a component that renders a toolbar for toggling highlight mode.


import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@mui/material';
import { Highlighter } from 'lucide-react';

export function HighlightToolbar({ isHighlightMode, onToggleHighlight }) {
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
      <Button
        onClick={onToggleHighlight}
        startIcon={<Highlighter size={16} />}
        variant={isHighlightMode ? 'contained' : 'outlined'}
        color={isHighlightMode ? 'primary' : 'inherit'}
        sx={{
          textTransform: 'none',
          ...(isHighlightMode
            ? {}
            : {
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'grey.100'
                }
              }
          )
        }}
      >
        {isHighlightMode ? 'Exit Highlight Mode' : 'Highlight Text'}
      </Button>
    </Paper>
  );
}

HighlightToolbar.propTypes = {
  isHighlightMode: PropTypes.bool.isRequired,
  onToggleHighlight: PropTypes.func.isRequired,
};
