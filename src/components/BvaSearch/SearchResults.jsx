import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Skeleton,
  IconButton
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function HighlightedText({ text, query }) {
  if (!query) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <Box
            key={i}
            component="mark"
            sx={{
              backgroundColor: 'accent.main',
              color: 'text.primary',
              borderRadius: '4px',
              paddingX: '2px',
              marginRight: '2px',
            }}
          >
            {part}
          </Box>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function SearchResults({
  results,
  savedDecisions,
  onSaveDecision,
  onCitationClick,
  searchQuery,
  isLoading,
  hasSearched
}) {
  if (isLoading) {
    const skeletonCards = Array.from({ length: 5 }, (_, index) => (
      <Paper
        key={`skeleton-${index}`}
        elevation={1}
        sx={{
          padding: 3,
          borderRadius: '12px',
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, marginRight: 2 }}>
            <Skeleton variant="text" width="50%" height={28} sx={{ marginBottom: 1 }} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="75%" height={20} sx={{ marginBottom: 1 }} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Paper>
    ));

    return <Box sx={{ marginTop: 4 }}>{skeletonCards}</Box>;
  }

  if (results.length === 0 && hasSearched) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          color: 'text.primary',
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          No results found for your search.
        </Typography>
        <Typography variant="body2">
          <Box component="span" sx={{ fontWeight: 500 }}>
            Suggestions:
          </Box>
        </Typography>
        <ul style={{ textAlign: 'left', margin: '0 auto', maxWidth: '300px' }}>
          <li>Check your spelling</li>
          <li>Try more general keywords</li>
          <li>Use fewer filters</li>
          <li>Enable synonym expansions</li>
        </ul>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      {results.map((decision) => (
        <Paper
          key={decision.id}
          elevation={1}
          sx={{
            padding: 3,
            borderRadius: '12px',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: 2,
            },
            marginBottom: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1, marginRight: 2 }}>
              {/* Gavel Icon and Citation Button */}
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                <GavelIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: '1.5rem',
                    marginRight: 1,
                  }}
                />
                <Button
                  onClick={() => onCitationClick(decision)}
                  sx={{
                    color: 'primary.main',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  Decision: {decision.title.replace(/\.txt$/, '')}
                </Button>
              </Box>

              {/* Description with Highlighted Text */}
              <Typography variant="body2">
                <Box
                  component="span"
                  sx={{
                    textTransform: 'none',
                    fontSize: '.91rem',
                    fontWeight: 600,
                    marginBottom: 1,
                    textAlign: 'left',
                    color: 'primary.main',
                    marginLeft: 1,
                  }}
                >
                  Summary
                </Box>
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 1 }}
              >
                <HighlightedText text={decision.description} query={searchQuery} />
              </Typography>
            </Box>

            {/* Save Decision Button 
            <IconButton
              onClick={() => onSaveDecision(decision)}
              sx={{
                color: savedDecisions.has(decision.id)
                  ? 'secondary.main'
                  : 'text.secondary',
                '&:hover': {
                  backgroundColor: savedDecisions.has(decision.id)
                    ? 'secondary.light'
                    : 'surface.100',
                },
              }}
            >
              {savedDecisions.has(decision.id) ? (
                <BookmarkIcon />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>*/}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
