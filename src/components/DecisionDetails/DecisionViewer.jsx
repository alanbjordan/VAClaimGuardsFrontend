// src/components/DecisionDetails/DecisionViewer.jsx

import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Typography } from '@mui/material';

/**
 * Utility to find all case-insensitive matches of `searchTerm` in `text`.
 * Returns an array of objects: { startIndex, endIndex }
 */
function findSearchMatches(text, searchTerm) {
  if (!searchTerm) return [];

  const matches = [];
  const query = searchTerm.toLowerCase();
  let startIndex = 0;

  while (true) {
    const idx = text.toLowerCase().indexOf(query, startIndex);
    if (idx === -1) break;
    matches.push({
      startIndex: idx,
      endIndex: idx + searchTerm.length,
    });
    startIndex = idx + searchTerm.length;
  }

  return matches;
}

export const DecisionViewer = forwardRef(function DecisionViewer(
  {
    decision,
    highlights,
    isHighlightMode,
    onHighlight,
    // NEW props for searching
    searchTerm = '',               // String to highlight in pink
    onSearchMatchCountChange = () => {}, // Callback to tell parent how many search matches we found
  },
  ref
) {
  const contentRef = useRef(null);

  // We'll store refs to each *search* match so we can scroll to them
  const searchMatchRefs = useRef([]);

  // -----------------------------
  // 1) Existing: Scroll to user highlight
  // -----------------------------
  useImperativeHandle(ref, () => ({
    scrollToHighlight: (highlightId) => {
      if (!contentRef.current) return;
      // Find the <mark id="highlight-XYZ"> for user highlight
      const el = contentRef.current.querySelector(`#highlight-${highlightId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    // NEW: Scroll to a search match by index
    scrollToSearchMatch: (matchIndex) => {
      const el = searchMatchRefs.current[matchIndex];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  }));

  // -----------------------------
  // 2) Handling user text selection for highlights (existing logic)
  // -----------------------------
  useEffect(() => {
    const handleSelection = () => {
      if (!isHighlightMode) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const range = selection.getRangeAt(0);
      const text = selection.toString().trim();
      if (!text) return;

      // Figure out startIndex relative to contentRef
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(contentRef.current);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const startIndex = preSelectionRange.toString().length;

      onHighlight({
        text,
        startIndex,
        endIndex: startIndex + text.length,
      });

      // Clear selection
      selection.removeAllRanges();
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [isHighlightMode, onHighlight]);

  // -----------------------------
  // 3) Merge user highlights + searchTerm highlights
  // -----------------------------
  // We'll create a combined array of highlights:
  // - user highlights from `highlights` (color from highlight.color, default "yellow")
  // - search highlights in pink
  //
  // We'll add an "id" for each search highlight as well: "search-X"
  // We'll track them with isSearchHighlight: true
  //
  const combinedHighlights = useCallback(() => {
    const text = decision.description || '';
    // 3a) Build array from user highlights
    const userHLs = highlights.map((hl) => ({
      id: hl.id,
      startIndex: hl.startIndex,
      endIndex: hl.endIndex,
      color: hl.color || 'yellow',
      isSearchHighlight: false,
    }));

    // 3b) Build array for search highlights
    const searchMatches = findSearchMatches(text, searchTerm).map((match, idx) => ({
      id: `search-${idx}`,
      startIndex: match.startIndex,
      endIndex: match.endIndex,
      color: 'pink',
      isSearchHighlight: true,
    }));

    // Update parent about how many search matches we found
    useEffect(() => {
      onSearchMatchCountChange(searchMatches.length);
    }, [searchMatches, onSearchMatchCountChange]);

    // 3c) Combine them
    const all = [...userHLs, ...searchMatches];

    // Sort by startIndex (ascending)
    all.sort((a, b) => a.startIndex - b.startIndex);

    return { text, all };
  }, [decision.description, highlights, searchTerm, onSearchMatchCountChange]);

  // -----------------------------
  // 4) Build final text segments
  // -----------------------------
  const renderContent = useCallback(() => {
    const { text, all } = combinedHighlights();

    // We'll construct a series of segments from 0..len
    const segments = [];
    let lastIndex = 0;

    // We'll also reset searchMatchRefs so we can push them in order
    searchMatchRefs.current = [];

    all.forEach((hl) => {
      // if there's unhighlighted text before this highlight, push it as normal text
      if (hl.startIndex > lastIndex) {
        segments.push({
          key: `txt-${lastIndex}`,
          text: text.slice(lastIndex, hl.startIndex),
          highlightId: null,
          isSearchHighlight: false,
        });
      }

      // This is the highlight segment
      segments.push({
        key: `hl-${hl.id}`,
        text: text.slice(hl.startIndex, hl.endIndex),
        highlightId: hl.id,
        color: hl.color,
        isSearchHighlight: hl.isSearchHighlight,
      });

      lastIndex = hl.endIndex;
    });

    // If there's leftover text at the end
    if (lastIndex < text.length) {
      segments.push({
        key: `txt-${lastIndex}`,
        text: text.slice(lastIndex),
        highlightId: null,
        isSearchHighlight: false,
      });
    }

    // Convert segments to JSX
    return segments.map((seg) => {
      if (seg.highlightId) {
        // It's a highlighted segment
        return (
          <Box
            key={seg.key}
            // For user highlights, we keep the old id => id="highlight-{id}" for scrolling
            // For search highlights, we do not need the same attribute, but let's keep it consistent
            id={seg.isSearchHighlight ? undefined : `highlight-${seg.highlightId}`}
            // If it's a search highlight, store a ref in searchMatchRefs
            ref={(el) => {
              if (seg.isSearchHighlight && el) {
                searchMatchRefs.current.push(el);
              }
            }}
            component="mark"
            sx={{
              backgroundColor: seg.color,
              borderRadius: 1,
              px: 0.5,
              py: 0.25,
              // For better visual separation
              marginRight: '1px',
            }}
          >
            {seg.text}
          </Box>
        );
      } else {
        // It's normal text
        return <React.Fragment key={seg.key}>{seg.text}</React.Fragment>;
      }
    });
  }, [combinedHighlights]);

  // -----------------------------
  // 5) Render
  // -----------------------------
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          cursor: isHighlightMode ? 'text' : 'auto',
          maxWidth: '100%',
          overflowX: 'hidden',
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
        >
          {renderContent()}
        </Typography>
      </Box>
    </Paper>
  );
});

DecisionViewer.propTypes = {
  decision: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // used for scroll targeting
      text: PropTypes.string.isRequired,
      color: PropTypes.string,
      startIndex: PropTypes.number.isRequired,
      endIndex: PropTypes.number.isRequired,
    })
  ).isRequired,
  isHighlightMode: PropTypes.bool.isRequired,
  onHighlight: PropTypes.func.isRequired,

  // NEW props for search integration
  searchTerm: PropTypes.string,               // The string to highlight in pink
  onSearchMatchCountChange: PropTypes.func,   // Called with the # of search matches
};
