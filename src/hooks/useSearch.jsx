// useSearch.jsx 


import { useState, useCallback } from 'react';

export function useSearch(text) {
  const [searchState, setSearchState] = useState({
    query: '',
    results: [],
    currentIndex: -1
  });

  const handleSearch = useCallback((query) => {
    if (!text || !query) {
      setSearchState({ query, results: [], currentIndex: -1 });
      return;
    }

    const results = [];
    let startIndex = 0;
    const lowerQuery = query.toLowerCase();
    const lowerText = text.toLowerCase();

    while (true) {
      const index = lowerText.indexOf(lowerQuery, startIndex);
      if (index === -1) break;
      results.push({
        startIndex: index,
        endIndex: index + query.length
      });
      startIndex = index + 1;
    }

    setSearchState({
      query,
      results,
      currentIndex: results.length > 0 ? 0 : -1
    });
  }, [text]);

  const setCurrentIndex = useCallback((index) => {
    setSearchState(prev => ({ ...prev, currentIndex: index }));
  }, []);

  return {
    searchState,
    searchActions: {
      handleSearch,
      setCurrentIndex
    }
  };
}
