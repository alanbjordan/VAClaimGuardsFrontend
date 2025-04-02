import React from 'react';
import { Box, Grid, Paper, Typography, Skeleton } from '@mui/material';
import { Activity, FileText, Clock } from 'lucide-react';

/**
 * StatusCards component
 * @param {Object} stats - an object like { conditions: number, documents: number, newItems: number, timeframe: string }
 * @param {boolean} isLoading - if true, show skeleton placeholders instead of actual counts
 */
function StatusCards({ stats, isLoading = false }) {
  if (isLoading) {
    // Render skeleton placeholders for each card
    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Conditions Skeleton */}
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': { boxShadow: 3 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Skeleton variant="circular" width={36} height={36} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text" width={60} />
                <Skeleton variant="text" width={90} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Documents Skeleton */}
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': { boxShadow: 3 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Skeleton variant="circular" width={36} height={36} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text" width={60} />
                <Skeleton variant="text" width={90} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* New Items Skeleton */}
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': { boxShadow: 3 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Skeleton variant="circular" width={36} height={36} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text" width={60} />
                <Skeleton variant="text" width={90} />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  // If not loading, show the real data
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Conditions Card */}
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: 1,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Activity size={20} style={{ color: '#688E26' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
                {stats.conditions}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Conditions
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* Documents Card */}
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: 1,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={20} style={{ color: '#001F54' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
                {stats.documents}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Documents
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      {/* New Items Card */}
      <Grid item xs={12} sm={4}>
        <Paper
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: 1,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={20} style={{ color: '#FFD700' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
                {stats.newItems}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                new {stats.timeframe}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default StatusCards;
