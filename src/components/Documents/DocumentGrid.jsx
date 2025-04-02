//DocumentGrid component to display a grid of documents with title, status, tags, and actions like download and delete.

import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip, IconButton, Stack, Tooltip } from '@mui/material';
import { FileText, Download, Trash2, Clock } from 'lucide-react';

function getStatusProps(status) {
  switch (status) {
    case 'approved':
      return { label: 'approved', sx: { bgcolor: 'success.light', color: 'success.dark' } };
    case 'pending':
      return { label: 'pending', sx: { bgcolor: 'warning.light', color: 'warning.dark' } };
    case 'rejected':
      return { label: 'rejected', sx: { bgcolor: 'error.light', color: 'error.dark' } };
    case 'expired':
      return { label: 'expired', sx: { bgcolor: 'grey.200', color: 'grey.800' } };
    default:
      return { label: status || 'unknown', sx: { bgcolor: 'grey.200', color: 'grey.800' } };
  }
}

export function DocumentGrid({ documents, onDownload, onDelete, onView }) {
  if (documents.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Box display="flex" justifyContent="center" mb={2}>
          <FileText size={48} style={{ color: '#9CA3AF' }} />
        </Box>
        <Typography variant="h6" color="text.primary" gutterBottom>
          No documents found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search or filters to find what you're looking for.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {documents.map((doc) => {
        const statusProps = getStatusProps(doc.status);

        return (
          <Grid key={doc.id} item xs={12} md={6} lg={4}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 2 },
              }}
            >
              <Box sx={{ position: 'relative', pt: '56.25%', bgcolor: 'grey.100' }}>
                {doc.thumbnailUrl ? (
                  <Box
                    component="img"
                    src={doc.thumbnailUrl}
                    alt={doc.title}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FileText size={48} style={{ color: '#9CA3AF' }} />
                  </Box>
                )}

                <Chip
                  label={statusProps.label}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    fontWeight: 'medium',
                    ...statusProps.sx,
                  }}
                />
              </Box>

              <CardContent sx={{ minWidth: 0 }}>
                <Tooltip title={doc.title}>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    noWrap
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { color: 'primary.main' },
                      mb: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    onClick={() => onView(doc)}
                  >
                    {doc.title}
                  </Typography>
                </Tooltip>

                <Box display="flex" alignItems="center" color="text.secondary" mb={1} sx={{ minWidth: 0 }}>
                  <Clock size={16} style={{ marginRight: 4, flexShrink: 0 }} />
                  <Typography variant="caption" noWrap>
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </Typography>
                </Box>

                {doc.tags && doc.tags.length > 0 && (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {doc.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                        }}
                      />
                    ))}
                  </Stack>
                )}

                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                  <IconButton
                    onClick={() => onDownload(doc)}
                    title="Download"
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main', bgcolor: 'grey.100' },
                    }}
                  >
                    <Download size={16} />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(doc)}
                    title="Delete"
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'error.main', bgcolor: 'error.light' },
                    }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
