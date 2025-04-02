import React, { useRef } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Upload as UploadIcon, Close as CloseIcon } from '@mui/icons-material';
import Button from '../../common/Button'; // The MUI-based Button you created

export default function DocumentUpload({ files, onUpload, onRemove }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
        Supporting Documents
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Upload your DD214 or other supporting documentation (optional)
      </Typography>

      <Button
        variant="secondary"
        icon={<UploadIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Documents
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
      />

      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {files.map((file, index) => (
            <Paper 
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 1,
                bgcolor: 'background.paper'
              }}
              elevation={1}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {file.name}
              </Typography>
              <IconButton
                aria-label="Remove document"
                onClick={() => onRemove(index)}
                sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
