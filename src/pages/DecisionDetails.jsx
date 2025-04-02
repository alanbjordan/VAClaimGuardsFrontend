// src/pages/DecisionDetails.jsx

import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Stack,
  Paper,
  CircularProgress,
  TextField,
} from '@mui/material';
import { ChevronLeft, ArrowUp, Send, Highlighter } from 'lucide-react';
import { getDecisionById } from '../data/mockDecisions';
import { AuthContext } from '../AuthContext';
import { useHighlights } from '../hooks/useHighlights';
import { useNotes } from '../hooks/useNotes';
import { useSearch } from '../hooks/useSearch';
import { DecisionViewer } from '../components/DecisionDetails/DecisionViewer';
import { NotesPanel } from '../components/DecisionDetails/NotesPanel';
import { SearchPanel } from '../components/DecisionDetails/SearchPanel';
import { SummaryModal } from '../components/DecisionDetails/SummaryModal';

/** Helper function to parse a .txt file name from a URL */
function parseCitationFromUrl(fullUrl) {
  if (!fullUrl) return '';
  const fileName = fullUrl.split('/').pop() || '';
  return fileName.replace('.txt', '');
}

/** 
 * Simple header with a "Back" icon and a citation label 
 */
function DecisionHeader({ citation, onBack }) {
  return (
    <Box mb={6}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.secondary',
          cursor: 'pointer',
          mb: 2,
          '&:hover': { color: 'text.primary' },
        }}
        onClick={onBack}
      >
        <IconButton size="small" sx={{ color: 'inherit', padding: 0 }}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography variant="body1" sx={{ color: 'inherit' }}>
          Back to Search
        </Typography>
      </Box>

      <Typography variant="h4" fontWeight="bold">
        Decision Citation: {citation || 'Unknown'}
      </Typography>
    </Box>
  );
}

/**
 * The main layout: 
 * - Left side has the decision text (with highlights).
 * - Right side has Summarize button, Save button, Search box, 
 *   toggle highlight, add notes, and a panel for notes & highlights.
 */
function DecisionContent({
  decision,
  highlights,
  notes,
  isHighlightMode,
  searchState,
  highlightActions,
  noteActions,
  searchActions,
  onScrollToHighlight,
  onSaveDecision,
  onSummarizeDecision,
  isSummarizing,
  summaryError,
}) {
  // Local state for the "Add Note" text input
  const [noteText, setNoteText] = useState('');

  // Add a new note to local state
  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    noteActions.addNote({ text: trimmed });
    setNoteText('');
  };

  return (
    <Grid container spacing={3}>
      {/* Left Panel: The Decision Text */}
      <Grid item xs={12} md={8}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <DecisionViewer
            ref={highlightActions.viewerRef}
            decision={decision}
            highlights={highlights}
            isHighlightMode={isHighlightMode}
            onHighlight={highlightActions.addHighlight}
            // For pink highlighting search terms
            searchTerm={searchState.query}
          />
        </Paper>
      </Grid>

      {/* Right Panel: Summarize, Save, Search, Highlight Toggle, Notes */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            position: { xs: 'static', md: 'sticky' },
            top: { xs: 'auto', md: 80 },
            zIndex: 1000,
            maxHeight: { xs: 'none', md: 'calc(100vh - 100px)' },
            overflowY: 'auto',
          }}
        >
          <Stack spacing={2}>
            {/* 1) Summarize Decision Button */}
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={onSummarizeDecision}
                disabled={isSummarizing || Boolean(decision.summary)}
                fullWidth
                sx={{ mb: 1 }}
              >
                {isSummarizing ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Summarizing...
                  </>
                ) : Boolean(decision.summary) ? (
                  'Summary Generated'
                ) : (
                  'Summarize Decision'
                )}
              </Button>
              {summaryError && (
                <Typography variant="body2" color="error">
                  {summaryError}
                </Typography>
              )}
            </Box>

            {/* 2) Save Decision Button */}
            <Box>{onSaveDecision}</Box>

            {/* 3) Search Panel */}
            <SearchPanel
              query={searchState.query}
              onSearch={searchActions.handleSearch}
              resultCount={searchState.results.length}
              currentMatch={searchState.currentIndex}
              onNavigate={searchActions.setCurrentIndex}
            />

            {/* 4) Toggle Highlight Mode and Add Note */}
            <Box>
              {/* Toggle Highlight Mode */}
              <Box sx={{ mb: 2 }}>
                <Button
                  onClick={highlightActions.toggleHighlightMode}
                  startIcon={<Highlighter size={16} />}
                  variant={isHighlightMode ? 'contained' : 'outlined'}
                  color={isHighlightMode ? 'primary' : 'inherit'}
                  sx={{
                    textTransform: 'none',
                    ...(isHighlightMode
                      ? {}
                      : {
                          color: 'text.secondary',
                          '&:hover': { backgroundColor: 'grey.100' },
                        }),
                  }}
                >
                  {isHighlightMode ? 'Exit Highlight Mode' : 'Highlight Text'}
                </Button>
              </Box>

              {/* Add a Note */}
              <Stack direction="row" spacing={1}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                  placeholder="Add a note..."
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNote}
                  sx={{ minWidth: 'auto' }}
                >
                  <Send size={16} />
                </Button>
              </Stack>
            </Box>

            {/* 5) Notes & Highlights Panel */}
            <Paper
              variant="outlined"
              sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}
            >
              <NotesPanel
                notes={notes}
                highlights={highlights}
                onDeleteNote={noteActions.deleteNote}
                onDeleteHighlight={highlightActions.deleteHighlight}
                onScrollToHighlight={onScrollToHighlight}
                // We pass the summary string so it can show a 'View Summary' if needed
                summary={decision.summary}
                onClickSummaryModal={decision.onOpenSummaryModal}
              />
            </Paper>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

/**
 * Main DecisionDetails component 
 * - Loads the ID from query params
 * - Fetches from local mock data (not a real API)
 * - Simulates summarizing with a setTimeout
 * - Manages highlights, notes, search, summary 
 */
export function DecisionDetails() {
  const navigate = useNavigate();
  const { search } = useLocation();

  // If you want to "refresh credits" after a summary, use AuthContext
  const { refreshCredits } = useContext(AuthContext);

  // Extract query parameters: e.g. ?decisionId=3&citation=21-12347
  const queryParams = new URLSearchParams(search);
  const decisionId = queryParams.get('decisionId');
  const queryCitation = queryParams.get('citation');

  // Local states
  const [decisionText, setDecisionText] = useState('');
  const [citation, setCitation] = useState('No Citation Provided');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Summaries
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // Summarization modal
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  // Back to top button
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  // Custom hooks for highlights/notes (local or stored in memory)
  const {
    highlights,
    setAllHighlights,
    isHighlightMode,
    toggleHighlightMode,
    addHighlight,
    deleteHighlight,
  } = useHighlights();
  const { notes, setAllNotes, addNote, deleteNote } = useNotes();

  // Search logic for text
  const { searchState, searchActions } = useSearch(decisionText);

  // A reference to the DecisionViewer (so we can scroll to highlights/search matches)
  const viewerRef = useRef(null);

  // Combine highlight actions
  const highlightActions = {
    isHighlightMode,
    toggleHighlightMode,
    addHighlight,
    deleteHighlight,
    viewerRef,
  };

  // Combine note actions
  const noteActions = {
    addNote,
    deleteNote,
  };

  // 1) Load local decision data by ID
  useEffect(() => {
    if (!decisionId) {
      setError('No decision ID provided.');
      return;
    }
    setIsLoading(true);

    // Simulate an async fetch
    setTimeout(() => {
      const foundDecision = getDecisionById(decisionId);
      if (!foundDecision) {
        setError(`Decision with ID ${decisionId} not found in mock data.`);
        setIsLoading(false);
        return;
      }

      // In this mock approach, the entire text is in foundDecision.bodyText
      setDecisionText(foundDecision.bodyText);

      // Use the queryCitation if provided, otherwise the real decision’s citation
      setCitation(queryCitation || foundDecision.citation);

      // Optionally, load previously saved notes/highlights from localStorage or anywhere
      // e.g., setAllNotes([...]) or setAllHighlights([...])

      setIsLoading(false);
    }, 600);
  }, [decisionId, queryCitation, setAllNotes, setAllHighlights]);

  // 2) Summarize Decision (fake)
  const handleSummarizeDecision = async () => {
    if (!decisionText) {
      return;
    }
    try {
      setIsSummarizing(true);
      setSummaryError(null);

      // Simulate a 1.2s server call
      setTimeout(() => {
        // Return some dummy text
        const fakeSummary = `**Summary**: This is a fake summary for decision #${decisionId}.\n\n${decisionText.slice(
          0,
          200
        )}... [etc]`;
        setSummary(fakeSummary);

        // If you want to simulate using up credits, call refreshCredits():
        refreshCredits();

        setIsSummarizing(false);
      }, 1200);
    } catch (error) {
      setSummaryError('Failed to summarize decision (mock).');
      setIsSummarizing(false);
    }
  };

  // 3) Scroll to highlight
  const handleScrollToHighlight = (highlightId) => {
    if (viewerRef.current) {
      viewerRef.current.scrollToHighlight(highlightId);
    }
  };

  // 4) Scroll to search match
  useEffect(() => {
    if (viewerRef.current && searchState.currentIndex >= 0) {
      viewerRef.current.scrollToSearchMatch(searchState.currentIndex);
    }
  }, [searchState.currentIndex]);

  // 5) "Save Decision" logic (fake). 
  // Replace or remove if you want to store notes in local storage or a custom place
  const [isSaving, setIsSaving] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState('Save Decision');

  const handleSaveDecision = async () => {
    try {
      setIsSaving(true);
      setSaveButtonText('Saving...');

      // Simulate saving to a server
      setTimeout(() => {
        console.log('Saved notes, highlights, summary to mock. (No real server).');
        setSaveButtonText('Decision Saved');
        setTimeout(() => setSaveButtonText('Save Decision'), 2000);
        setIsSaving(false);
      }, 800);
    } catch (err) {
      console.error('Error saving (mock):', err);
      setSaveButtonText('Save Decision');
      setIsSaving(false);
    }
  };

  // 6) "Back to Search"
  const handleBack = () => {
    navigate('/bvasearch');
  };

  // 7) Show/hide "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8) Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 9) Check loading/error states
  if (isLoading) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <Typography variant="h6">Loading Decision Text...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Error Loading Decision
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            {error}
          </Typography>
          <Button variant="contained" onClick={handleBack}>
            Return to Search
          </Button>
        </Box>
      </Container>
    );
  }

  if (!decisionText) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Decision Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            We could not load the requested decision text.
          </Typography>
          <Button variant="contained" onClick={handleBack}>
            Return to Search
          </Button>
        </Box>
      </Container>
    );
  }

  // Build the "decision" object for the DecisionContent + viewer
  const decisionObject = {
    citation,
    description: decisionText,
    summary,
    onOpenSummaryModal: () => setIsSummaryModalOpen(true),
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header: "Back to Search" + Citation */}
        <DecisionHeader citation={citation} onBack={handleBack} />

        {/* Main Content */}
        <DecisionContent
          decision={decisionObject}
          highlights={highlights}
          notes={notes}
          isHighlightMode={isHighlightMode}
          searchState={searchState}
          highlightActions={highlightActions}
          noteActions={noteActions}
          searchActions={searchActions}
          onScrollToHighlight={handleScrollToHighlight}
          onSaveDecision={
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveDecision}
              disabled={isSaving}
              fullWidth
            >
              {saveButtonText}
            </Button>
          }
          onSummarizeDecision={handleSummarizeDecision}
          isSummarizing={isSummarizing}
          summaryError={summaryError}
        />

        {/* Modal to display the summary in Markdown */}
        <SummaryModal
          open={isSummaryModalOpen}
          onClose={() => setIsSummaryModalOpen(false)}
          summary={summary}
        />

        {/* "Back to Top" floating button */}
        {showScrollTopButton && (
          <Box
            sx={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
            }}
          >
            <IconButton
              onClick={scrollToTop}
              sx={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                width: 38,
                height: 38,
                borderRadius: '50%',
                color: 'text.primary',
                transition: 'background-color 0.2s ease',
                '&:hover': { backgroundColor: '#f7f7f7' },
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <ArrowUp size={20} />
            </IconButton>
          </Box>
        )}
      </Container>
    </>
  );
}

export default DecisionDetails;
