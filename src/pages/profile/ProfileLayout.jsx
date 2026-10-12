import React from 'react';

import {
  Box,
  Button,
  Typography,
  Paper,
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { NavLink, Outlet } from 'react-router-dom';

export default function ProfileLayout() {
  const navButtonSx = {
    flex: { xs: 1, sm: 'initial' },
    minWidth: { xs: 0, sm: 120 },
    px: { xs: 1.5, sm: 3 },
    py: 1.2,
    gap: 1,
    textTransform: 'none',
    borderRadius: 2,
    whiteSpace: 'nowrap',

    '&.active': {
      backgroundColor: 'primary.main',
      color: '#fff',
      borderColor: 'primary.main',

      '&:hover': {
        backgroundColor: 'primary.dark',
      },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 3, sm: 4, md: 6 },
        boxSizing: 'border-box',
      }}
    >
      {/* Profile heading */}
      <Typography
        component="h1"
        variant="h3"
        sx={{
          fontSize: {
            xs: '1.8rem',
            sm: '2.2rem',
            md: '2.7rem',
          },
          fontWeight: 700,
          mb: 1,
        }}
      >
        My Profile
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: { xs: 3, md: 4 },
        }}
      >
        Manage your personal information and orders.
      </Typography>

      {/* Profile navigation */}
      <Box
        component="nav"
        aria-label="Profile navigation"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          mb: { xs: 2, md: 3 },
        }}
      >
        {/* Profile information */}
        <Button
          component={NavLink}
          to="/profile"
          end
          variant="outlined"
          startIcon={<AccountCircleIcon />}
          sx={navButtonSx}
        >
          Info
        </Button>

        {/* Profile orders */}
        <Button
          component={NavLink}
          to="/profile/orders"
          variant="outlined"
          startIcon={<ShoppingBagOutlinedIcon />}
          sx={navButtonSx}
        >
          Orders
        </Button>
      </Box>

      {/* Nested profile page */}
      <Paper
        elevation={0}
        sx={{
          minWidth: 0,
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: {
            xs: 2,
            md: 3,
          },
          boxShadow: '0 3px 14px rgba(0,0,0,0.05)',
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
}