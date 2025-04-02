import React from 'react';
import { Box, Typography } from '@mui/material';
import { Shield } from 'lucide-react';

function TrustBanner() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        py: 2, 
        mt: 3 
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          color: 'text.secondary' 
        }}
      >
        <Shield size={16} style={{ color: 'inherit' }} />
        <Typography variant="body2" sx={{ color: 'inherit' }}>
          HIPAA & VA Compliant | Your data is secure
        </Typography>
      </Box>
    </Box>
  );
}

export default TrustBanner;
