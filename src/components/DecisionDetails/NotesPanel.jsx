// src/components/DecisionDetails/NotesPanel.jsx

import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack
} from '@mui/material';
import { Trash2 } from 'lucide-react';

export function NotesPanel({
  notes,
  highlights,
  onDeleteNote,
  onDeleteHighlight,
  onScrollToHighlight,
  summary,
  onClickSummaryModal,
}) {
  // Decide how many chars to show in truncated form
  const TRUNCATE_LENGTH = 100;

  // Simple helper to truncate the summary if needed
  const truncateSummary = (text) => {
    if (!text) return '';
    return text.length > TRUNCATE_LENGTH
      ? text.slice(0, TRUNCATE_LENGTH) + '...'
      : text;
  };

  return (
    <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" component="h2" fontWeight="bold">
          Notes & Highlights
        </Typography>
      </Box>

      {/* If there's a summary string, show a truncated snippet */}
      {summary && summary.trim() !== '' && (
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'grey.100',
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'grey.200' },
          }}
          onClick={() => onClickSummaryModal?.()}
        >
          <Typography variant="subtitle2" mb={1}>
            Decision Summary (click to view full):
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
            }}
          >
            {truncateSummary(summary)}
          </Typography>
        </Box>
      )}

      {/* Main scroll area for notes & highlights */}
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {/* Render notes */}
        {notes.map((note) => (
          <Box
            key={note.id}
            sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {note.text}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => onDeleteNote(note.id)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Stack>
          </Box>
        ))}

        {/* Render highlights */}
        {highlights.map((highlight) => (
          <Box
            key={highlight.id}
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: 'divider',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'grey.50' },
            }}
            onClick={() => onScrollToHighlight?.(highlight.id)}
          >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                  Highlighted Text:
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {highlight.text}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from also triggering scroll
                  onDeleteHighlight(highlight.id);
                }}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

NotesPanel.propTypes = {
  notes: PropTypes.array.isRequired,
  highlights: PropTypes.array.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  onDeleteHighlight: PropTypes.func.isRequired,
  onScrollToHighlight: PropTypes.func,
  /** The summary is now always a string of Markdown or plain text. */
  summary: PropTypes.string,
  onClickSummaryModal: PropTypes.func,
};
