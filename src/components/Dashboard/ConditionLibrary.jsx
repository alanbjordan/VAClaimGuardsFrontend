import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import SearchBar from './ConditionLibrary/SearchBar';
import ConditionCard from './ConditionLibrary/ConditionCard';
import ConditionDetailsModal from './ConditionDetailsModal';
import FilterModal from './ConditionLibrary/FilterModal';

function ConditionLibrary({ conditions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter and sort states
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "in-service", "current"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const filteredAndSortedConditions = useMemo(() => {
    let result = [...conditions];

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter((condition) =>
        condition.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus === "in-service") {
      result = result.filter((condition) => condition.status === "In-Service");
    } else if (filterStatus === "current") {
      result = result.filter((condition) => condition.status === "Current");
    }

    // Apply date range filter if both startDate and endDate are set
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      result = result.filter((condition) => {
        if (!condition.date) return false; // Exclude conditions without dates
        const condDate = new Date(condition.date);
        return condDate >= start && condDate <= end;
      });
    }

    // Apply sorting by name
    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [conditions, searchQuery, filterStatus, sortOrder, startDate, endDate]);

  const handleViewDetails = (condition) => {
    setSelectedCondition(condition);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCondition(null);
    setModalOpen(false);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleFilterClick = () => {
    setFilterOpen(true);
  };

  const handleSortClick = () => {
    // Toggle sort order
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterApply = (newStatus, newStartDate, newEndDate) => {
    setFilterStatus(newStatus);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setFilterOpen(false);
  };

  const handleFilterCancel = () => {
    setFilterOpen(false);
  };

  return (
    <Paper
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Typography  fontWeight={600} sx={{ color: 'primary.dark', mb: 0.5 }}>
        Condition Library
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Review and manage identified conditions
      </Typography>

      <SearchBar
        onSearchChange={handleSearchChange}
        onFilterClick={handleFilterClick}
        onSortClick={handleSortClick}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 2,
          maxHeight: '1000px', // Adjust as needed
          overflowY: 'auto',
          pr: 1,
        }}
      >
        {filteredAndSortedConditions.map((condition, index) => (
          <ConditionCard
            key={index}
            condition={condition}
            onViewDetails={() => handleViewDetails(condition)}
          />
        ))}
      </Box>

      <ConditionDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        condition={selectedCondition}
      />

      <FilterModal
        open={filterOpen}
        currentStatus={filterStatus}
        startDate={startDate}
        endDate={endDate}
        onApply={handleFilterApply}
        onCancel={handleFilterCancel}
      />
    </Paper>
  );
}

export default ConditionLibrary;
