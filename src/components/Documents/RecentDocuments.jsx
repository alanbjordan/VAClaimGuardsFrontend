// RecentDocuments component to display recently modified documents

import React from 'react';
import { Box, Typography, Grid, Paper, IconButton, Tooltip } from '@mui/material';
import { FileText, MoreVertical } from 'lucide-react';

export function RecentDocuments({ documents, onDocumentClick }) {
  const recentDocs = documents.slice(0, 4);

  return (
    <Box mb={4}>
      <Typography variant="h6" component="h2" fontWeight="bold" color="text.primary" mb={2}>
        Recently Modified
      </Typography>
      
      <Grid container spacing={2}>
        {recentDocs.map((doc) => (
          <Grid item xs={12} md={6} lg={3} key={doc.id}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderColor: 'grey.200',
                transition: 'box-shadow 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
              onClick={() => onDocumentClick(doc)}
            >
              <Box display="flex" alignItems="start" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={2} sx={{ minWidth: 0 }}> 
                  {/* minWidth:0 ensures that the noWrap text can properly truncate */}
                  <FileText size={40} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                  <Box sx={{ overflow: 'hidden', minWidth: 0 }}>
                    <Tooltip title={doc.title}>
                      <Typography 
                        variant="body2" 
                        fontWeight="medium" 
                        color="text.primary" 
                        noWrap
                      >
                        {doc.title}
                      </Typography>
                    </Tooltip>
                    <Typography variant="caption" color="text.secondary">
                      {(doc.size / 1024).toFixed(1)} KB
                    </Typography>
                  </Box>
                </Box>

                <Tooltip title="More options">
                  <IconButton 
                    size="small" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      // Add a handler here if needed for more options
                    }}
                    sx={{ flexShrink: 0 }}
                  >
                    <MoreVertical size={16} style={{ color: '#9CA3AF' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
