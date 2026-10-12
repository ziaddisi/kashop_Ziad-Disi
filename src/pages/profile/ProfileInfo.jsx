import React from 'react';

import {
  Box,
  Typography,
  Avatar,
  Paper,
} from '@mui/material';

export default function ProfileInfo() {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
      }}
    >
      {/* Profile heading */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
      >
        <Avatar
          sx={{
            width: { xs: 56, sm: 68 },
            height: { xs: 56, sm: 68 },
            bgcolor: 'primary.main',
            fontSize: { xs: 28, sm: 34 },
            fontWeight: 700,
          }}
        >
          P
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            Profile Information
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Manage your account information.
          </Typography>
        </Box>
      </Box>

      {/* Information section */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          bgcolor: 'background.default',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
          }}
        >
          Your personal account information will appear here.
        </Typography>
      </Paper>
    </Box>
  );
}