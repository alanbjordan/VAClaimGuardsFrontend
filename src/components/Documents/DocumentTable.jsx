import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import { MoreHorizontal, FileText, Download, Search as SearchIcon } from 'lucide-react';
import axios from 'axios';

// Note: If you have a dedicated axios instance, you can import it.
// Otherwise, create one here or just use axios directly.
const axiosInstance = axios.create({
  // For example:
  baseURL: import.meta.env.VITE_API_URL || 'https://vaclaimguard.azurewebsites.net',
  withCredentials: true
});

export function DocumentTable({
  documents,
  onDownload,
  onDelete,
  onRenameClick,
  onChangeCategoryClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Menu open/close
  const handleMenuOpen = (event, doc) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDoc(null);
  };

  // --- NEW: On row click, fetch preview_url & open in new tab ---
  const handleRowClick = async (doc) => {
    try {
      // Call your backend route: /documents/preview/<file_id>
      // This returns { preview_url: "..." }
      const response = await axiosInstance.get(`/documents/preview/${doc.id}`);
      const { preview_url } = response.data;

      if (preview_url) {
        // Open the SAS URL in a new tab
        window.open(preview_url, '_blank');
      } else {
        console.warn("No preview_url returned for doc:", doc);
      }
    } catch (err) {
      console.error('Failed to get preview URL:', err);
      // Optionally display an error message or toast
    }
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="grey.200"
        p={2}
      >
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
          All Files
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search files..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={18} style={{ color: '#9CA3AF' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                bgcolor: 'background.paper',
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              color: 'text.primary',
              borderColor: 'grey.200',
              '&:hover': { backgroundColor: 'grey.100' }
            }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Box}>
        <Table size="small" sx={{ minWidth: 650, tableLayout: 'fixed' }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.75rem', color: 'text.secondary', width: '30%' }}>
                File name
              </TableCell>
              <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.75rem', color: 'text.secondary', width: '20%' }}>
                Uploaded by
              </TableCell>
              <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.75rem', color: 'text.secondary', width: '20%' }}>
                Last modified
              </TableCell>
              <TableCell sx={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '0.75rem', color: 'text.secondary', width: '20%' }}>
                Size
              </TableCell>
              <TableCell sx={{ width: '10%' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => (
              <TableRow
                key={doc.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover .action-icon': {
                    color: 'primary.main',
                  },
                }}
              >
                {/* Use handleRowClick for onClick */}
                <TableCell onClick={() => handleRowClick(doc)} sx={{ maxWidth: 0, overflow: 'hidden' }}>
                  <Box display="flex" alignItems="center">
                    <FileText size={20} style={{ color: '#9CA3AF', marginRight: 8, flexShrink: 0 }} />
                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Tooltip title={doc.title}>
                        <Typography
                          variant="body2"
                          color="text.primary"
                          noWrap
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            '&:hover': { color: 'primary.main' },
                          }}
                        >
                          {doc.title}
                        </Typography>
                      </Tooltip>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {doc.uploadedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {doc.lastModified?.toLocaleDateString?.() || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {(doc.size / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload(doc);
                      }}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                      className="action-icon"
                    >
                      <Download size={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(e, doc);
                      }}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                      className="action-icon"
                    >
                      <MoreHorizontal size={16} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}

            {documents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No documents found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        elevation={2}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            if (selectedDoc) onRenameClick(selectedDoc);
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            if (selectedDoc) onChangeCategoryClick(selectedDoc);
          }}
        >
          Change Category
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            if (selectedDoc) onDelete(selectedDoc);
          }}
          sx={{ color: 'error.main' }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
}
