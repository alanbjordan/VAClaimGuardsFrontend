import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Tooltip,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { Upload, FileText, Clock, CheckCircle } from 'lucide-react';

import UploadZone from './DocumentUpload/UploadZone';

// Decide which statuses are "in progress"
function isProcessingStatus(status) {
  return ['Uploading', 'Extracting Data', 'Finding Evidence'].includes(status);
}

function FileIcon() {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        backgroundColor: 'background.default',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FileText size={16} style={{ color: '#333e4f' }} />
    </Box>
  );
}

/**
 * Safely parse a "DD/MM/YYYY" string into a Date object,
 * then return a localized string. Otherwise return empty.
 */
function parseDDMMYYYY(dateStr) {
  if (!dateStr) return '';
  const [day, month, year] = dateStr.split('/');
  const d = new Date(+year, +month - 1, +day);
  return isNaN(d) ? '' : d.toLocaleString();
}

// Renders one "recent upload" row
function RecentUpload({ fileName, status, uploadTime }) {
  const inProgress = isProcessingStatus(status);

  // Decide which icon or spinner to show
  let iconContent;
  if (inProgress) {
    iconContent = (
      <Box
        sx={{
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      >
        <Clock size={16} style={{ color: '#6B7280' }} />
      </Box>
    );
  } else if (status === 'Complete') {
    iconContent = <CheckCircle size={18} style={{ color: '#10B981' }} />;
  } else if (status === 'Failed') {
    iconContent = (
      <Typography variant="caption" sx={{ color: 'error.main' }}>
        Failed
      </Typography>
    );
  } else {
    // fallback icon or text
    iconContent = (
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {uploadTime || status}
      </Typography>
    );
  }

  // Wrap the icon/spinner in a Tooltip for the status text
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
        mb: 1,
      }}
    >
      {/* Left side: File icon + file name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FileIcon />
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '200px',
          }}
        >
          {fileName}
        </Typography>
      </Box>

      {/* Right side: Tooltip with the status text */}
      <Tooltip title={status || ''} arrow>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {iconContent}
        </Box>
      </Tooltip>
    </Box>
  );
}

/**
 * DocumentUpload:
 * - Receives the *full* documents list from the parent
 * - Calls onUploadComplete() after an upload, so the parent can re-fetch
 */
function DocumentUpload({ documents, onUploadComplete }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Pull from localStorage
  const userUUID = localStorage.getItem('userUUID') || '';
  const token = localStorage.getItem('userToken');
  const API_URL = import.meta.env.VITE_API_URL || 'https://vaclaimguard.azurewebsites.net';

  // Handler when files are selected
  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  // Upload the selected files
  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    setUploading(true);
    setErrorMessage(null);
  
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        console.log('Appending file to formData:', file.name, file.size, 'bytes');
        formData.append('file', file);
      });
      formData.append('userUUID', userUUID);
  
      // Optional: log the FormData entries
      for (let [key, value] of formData.entries()) {
        console.log(`FormData entry: ${key}:`, value);
      }
  
      // Send the request
      const headers = {
        'Content-Type': 'multipart/form-data',
        userUUID: userUUID,
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.post(`${API_URL}/upload`, formData, { headers });
      console.log('Upload response:', response);
  
      // If successful, clear selected files
      setSelectedFiles([]);
  
      // Re-fetch from server so newly uploaded docs appear
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (err) {
      console.error('Error uploading files:', err);
      setErrorMessage('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // We'll show the top 5 most recent documents
  const recentDocuments = documents.slice(0, 5);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1,
      }}
    >
      {/* Error alert */}
      {errorMessage && (
        <Alert
          severity="error"
          onClose={() => setErrorMessage(null)}
          sx={{ mb: 2 }}
        >
          {errorMessage}
        </Alert>
      )}

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ color: 'text.primary' }}>
          Document Upload
        </Typography>
        <Button variant="text" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
          View All
        </Button>
      </Box>

      {/* Upload Zone */}
      <UploadZone onFilesSelected={handleFilesSelected} />

      {/* Files selected but not yet uploaded */}
      {selectedFiles.length > 0 && (
        <Box mt={3}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
            Files to Upload:
          </Typography>
          {selectedFiles.map((file, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.default',
                mb: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px',
                }}
              >
                {file.name}
              </Typography>
              <Button
                variant="text"
                sx={{ color: 'error.main', fontSize: '0.75rem' }}
                onClick={() => {
                  setSelectedFiles((prev) => prev.filter((_, index) => index !== i));
                }}
              >
                Remove
              </Button>
            </Box>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 2, borderRadius: 2, textTransform: 'none', width: '100%' }}
            disabled={uploading}
            onClick={handleUpload}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </Box>
      )}

      {/* Recent Uploads Section 
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
          Recent Uploads
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {recentDocuments.map((doc, index) => (
            <RecentUpload
              key={doc.file_id || index}
              fileName={doc.file_name || doc.title || doc.fileName}
              status={doc.status || 'Complete'}
              uploadTime={
                // If doc.modified is "DD/MM/YYYY", parse it manually:
                doc.modified
                  ? parseDDMMYYYY(doc.modified)
                  : doc.uploaded_at
                  ? new Date(doc.uploaded_at).toLocaleString()
                  : ''
              }
            />
          ))}
        </Box>
      </Box>
      */}
    </Paper>
  );
}

export default DocumentUpload;
