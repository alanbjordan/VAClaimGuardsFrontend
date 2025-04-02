// src/pages/BvaSearch.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import from our mock data file
import { searchMockDecisions } from '../data/mockDecisions';

import { SearchHeader } from '../components/BvaSearch/SearchHeader';
import { SearchBar } from '../components/BvaSearch/SearchBar';
import { SearchFilters } from '../components/BvaSearch/SearchFilters';
import { SearchResults } from '../components/BvaSearch/SearchResults';
import { Pagination } from '../components/BvaSearch/Pagination';

function parseCitationFromUrl(fullUrl) {
  if (!fullUrl) return '';
  const fileName = fullUrl.split('/').pop() || '';
  return fileName.replace('.txt', '');
}

export const BvaSearch = () => {
  // Prepopulate “Sleep Apnea” for the developer
  const [searchInput, setSearchInput] = useState('Sleep Apnea');
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [savedDecisions, setSavedDecisions] = useState(new Set());
  const [filters, setFilters] = useState({
    decisionDate: undefined,
    decisionType: undefined,
    includeSynonyms: false,
    advancedQuery: '',
  });

  // Track whether the user has actually submitted at least one search
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  // Instead of real fetching, use local search function
  const handleFetch = async (searchQuery, pageNumber) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    setIsLoading(true);

    // Fake a short delay to simulate fetching
    setTimeout(() => {
      const { results: found } = searchMockDecisions(searchQuery, {
        decisionDate: filters.decisionDate,
        decisionType: filters.decisionType,
      });
      setResults(found);
      setIsLoading(false);
    }, 600);
  };

  const handleSearchSubmit = () => {
    setHasSearched(true);
    const trimmedQuery = searchInput.trim();
    setQuery(trimmedQuery);
    setCurrentPage(1);
    handleFetch(trimmedQuery, 1);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // If real pagination existed, we'd call handleFetch(query, newPage) here
  };

  const handleQueryChange = (newValue) => {
    setSearchInput(newValue);
  };

  const handleSaveDecision = (decision) => {
    setSavedDecisions((prev) => {
      const next = new Set(prev);
      if (next.has(decision.id)) {
        next.delete(decision.id);
      } else {
        next.add(decision.id);
      }
      return next;
    });
  };

  const handleCitationClick = (decision) => {
    const citation = parseCitationFromUrl(decision.url);
    navigate(`/decision?decisionId=${decision.id}&citation=${encodeURIComponent(citation)}`);
  };

  return (
    <div style={{ marginTop: '16px', marginBottom: '16px' }}>
      {/* Header */}
      <SearchHeader onBackClick={() => navigate('/dashboard')} />

      {/* Search Bar */}
      <SearchBar
        query={searchInput}
        onQueryChange={handleQueryChange}
        onSearch={handleSearchSubmit}
        onToggleFilters={() => setShowFilters(!showFilters)}
        isLoading={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit();
          }
        }}
      />

      {/* Filters */}
      {showFilters && (
        <SearchFilters
          advancedQuery={filters.advancedQuery}
          includeSynonyms={filters.includeSynonyms}
          onAdvancedQueryChange={(value) =>
            setFilters((prev) => ({ ...prev, advancedQuery: value }))
          }
          onSynonymsChange={(value) =>
            setFilters((prev) => ({ ...prev, includeSynonyms: value }))
          }
          onReset={() =>
            setFilters({
              decisionDate: undefined,
              decisionType: undefined,
              includeSynonyms: false,
              advancedQuery: '',
            })
          }
          onApply={() => {
            handleSearchSubmit();
          }}
        />
      )}

      {/* Results */}
      <SearchResults
        isLoading={isLoading}
        results={results}
        savedDecisions={savedDecisions}
        onSaveDecision={handleSaveDecision}
        onCitationClick={handleCitationClick}
        searchQuery={query}
        hasSearched={hasSearched}
      />

      {/* Pagination - only if we have results */}
      {results.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalResults={results.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BvaSearch;
