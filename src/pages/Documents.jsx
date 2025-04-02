// src/pages/Documents.jsx

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  CircularProgress, 
  Typography, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// -- Mock Data Import
import { mockDocuments } from '../data/documentMockData';

// -- Existing components
import { DocumentHeader } from '../components/Documents/DocumentHeader';
import { RecentDocuments } from '../components/Documents/RecentDocuments';
import { DocumentTable } from '../components/Documents/DocumentTable';

// -- DocumentUpload
import DocumentUpload from '../components/Dashboard/DocumentUpload.jsx';

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rename dialog state
  const [selectedDocForRename, setSelectedDocForRename] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  // Change Category dialog state
  const [selectedDocForCategory, setSelectedDocForCategory] = useState(null);
  const [categoryValue, setCategoryValue] = useState('');

  const navigate = useNavigate();

  // Simulate fetching documents (but really just load from mock)
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // Instead of an API call, we just set documents to the mock
      // Simulate a short delay if you want a loading spinner
      setTimeout(() => {
        setDocuments(mockDocuments);
        setLoading(false);
      }, 600); // 0.6s delay
    } catch (err) {
      console.error('Failed to fetch documents (mock):', err);
      setError('Failed to load mock documents. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentClick = (doc) => {
    console.log('Opening document:', doc.title);
    // Implement preview modal or navigation if desired
  };

  const handleDownload = async (doc) => {
    console.log('Downloading:', doc.title);
    // In a real setup, you might do: window.location.href = doc.url;
  };

  const handleDelete = async (doc) => {
    if (!window.confirm(`Are you sure you want to delete "${doc.title}"?`)) return;
    try {
      // In a mock scenario, we can filter out the deleted doc from local state
      setDocuments((prevDocs) => prevDocs.filter((d) => d.id !== doc.id));
      // In a real scenario, you'd call your API or backend
    } catch (err) {
      console.error('Failed to delete document (mock):', err);
      setError('Failed to delete document. Please try again.');
    }
  };

  // Rename
  const handleRenameClick = (doc) => {
    setSelectedDocForRename(doc);
    setRenameValue(doc.title);
  };

  const handleRename = async () => {
    if (!renameValue.trim()) return;
    try {
      // Mock rename: update local state
      setDocuments((prevDocs) =>
        prevDocs.map((d) =>
          d.id === selectedDocForRename.id ? { ...d, title: renameValue.trim() } : d
        )
      );
      setSelectedDocForRename(null);
      setRenameValue('');
    } catch (err) {
      console.error('Failed to rename document (mock):', err);
      setError('Failed to rename document. Please try again.');
    }
  };

  // Change Category
  const handleChangeCategoryClick = (doc) => {
    setSelectedDocForCategory(doc);
    // If doc.category is missing or empty, default to 'Unclassified'
    setCategoryValue(doc.category || 'Unclassified');
  };

  const handleChangeCategory = async () => {
    if (!categoryValue.trim()) return;
    try {
      // Mock category change: update local state
      setDocuments((prevDocs) =>
        prevDocs.map((d) =>
          d.id === selectedDocForCategory.id ? { ...d, category: categoryValue.trim() } : d
        )
      );
      setSelectedDocForCategory(null);
      setCategoryValue('');
    } catch (err) {
      console.error('Failed to change category (mock):', err);
      setError('Failed to change category. Please try again.');
    }
  };

  // Render loading or error states
  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button variant="contained" onClick={fetchDocuments}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <>
      {/* Header */}
      <DocumentHeader onBackClick={() => navigate('/dashboard')} />

      {/* DocumentUpload Component: handles drag/drop + recent uploads */}
      <Box sx={{ mb: 3 }}>
        <DocumentUpload 
          documents={documents}
          onUploadComplete={fetchDocuments}
        />
      </Box>

      {/* If no documents at all */}
      {documents.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" mb={2}>
            No Documents Found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            You haven't uploaded any documents yet.
          </Typography>
          {/* Optionally remove this button if DocumentUpload is enough */}
        </Box>
      ) : (
        <>
          {/* Example: Remove or keep your "RecentDocuments" if needed
          <RecentDocuments
            documents={documents}
            onDocumentClick={handleDocumentClick}
          />
          */}

          <Box mt={4}>
            <DocumentTable
              documents={documents}
              onDownload={handleDownload}
              onDocumentClick={handleDocumentClick}
              onDelete={handleDelete}
              onRenameClick={handleRenameClick}
              onChangeCategoryClick={handleChangeCategoryClick}
            />
          </Box>
        </>
      )}

      {/* Rename Dialog */}
      <Dialog
        open={!!selectedDocForRename}
        onClose={() => setSelectedDocForRename(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Rename Document</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            fullWidth
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedDocForRename(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleRename}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Category Dialog */}
      <Dialog
        open={!!selectedDocForCategory}
        onClose={() => setSelectedDocForCategory(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Change Document Category</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="category-label">New Category</InputLabel>
            <Select
              labelId="category-label"
              label="New Category"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            >
              <MenuItem value="Unclassified">Unclassified</MenuItem>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="financial">Financial</MenuItem>
              <MenuItem value="legal">Legal</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedDocForCategory(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangeCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
