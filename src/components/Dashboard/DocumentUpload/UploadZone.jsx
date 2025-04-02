//UploadZone.jsx


import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Upload } from 'lucide-react';

function UploadZone({ onFilesSelected }) {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Log each file’s name and size to confirm it’s non-empty
    files.forEach(file => {
      console.log('Selected file:', file.name, '- size:', file.size, 'bytes');
    });

    onFilesSelected(files);

    // Reset the input so onChange can fire again if user reselects the same file
    event.target.value = null;
  };

  return (
    <Box
      sx={{
        border: '2px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        transition: 'border-color 0.3s',
        '&:hover': {
          borderColor: 'primary.main',
        },
        position: 'relative',
      }}
    >
      <Upload size={24} style={{ marginBottom: '8px', color: '#1E88E5' }} />
      <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'primary.dark', mb: 0.5 }}>
        Drag and drop files here
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        or click to browse from your computer
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ borderRadius: 2, textTransform: 'none' }}
        onClick={handleBrowseClick}
      >
        Browse Files
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
      />
    </Box>
  );
}

export default UploadZone;
