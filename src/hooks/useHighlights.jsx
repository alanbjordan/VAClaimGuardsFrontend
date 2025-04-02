// useHighlights.jsx

import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';

export function useHighlights() {
  const [highlights, setHighlights] = useState([]);
  const [isHighlightMode, setIsHighlightMode] = useState(false);

  // Overwrite all highlights with an array from the server
  const setAllHighlights = useCallback((serverHighlights) => {
    setHighlights(serverHighlights);
  }, []);

  const toggleHighlightMode = useCallback(() => {
    setIsHighlightMode((prev) => !prev);
  }, []);

  const addHighlight = useCallback((selection) => {
    const newHighlight = {
      id: generateId(),
      text: selection.text,
      color: '#FFD700', // highlight color
      startIndex: selection.startIndex,
      endIndex: selection.endIndex,
    };
    setHighlights((prev) => [...prev, newHighlight]);
  }, []);

  const deleteHighlight = useCallback((id) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
  }, []);

  return {
    highlights,
    setAllHighlights,       // <-- new method for overwriting highlights
    isHighlightMode,
    toggleHighlightMode,
    addHighlight,
    deleteHighlight,
  };
}
