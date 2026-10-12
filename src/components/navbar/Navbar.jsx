import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';

import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useCart from '../../hooks/useCart';
import useAuthStore from '../../store/useAuthStore';
import useThemeStore from '../../hooks/useThemeStore';

import i18n from '../../i18next';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const { data } = useCart();
  const cartCount = data?.items?.length || 0;

  const { mode, toggleMode } = useThemeStore();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#f5f5f7',
          color: 'black',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1, sm: 2, md: 3 },
            gap: { xs: 0.5, sm: 1 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Store logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: { xs: 1, sm: 2, lg: 3 },
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 'bold',
              color: 'inherit',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Kashop Store
          </Typography>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="Open navigation menu"
            onClick={handleMenuOpen}
            sx={{
              display: { xs: 'flex', lg: 'none' },
              ml: 'auto',
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 190,
                },
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/"
              onClick={handleMenuClose}
            >
              {t('Home')}
            </MenuItem>

            <MenuItem
              component={Link}
              to="/products"
              onClick={handleMenuClose}
            >
              {t('Products')}
            </MenuItem>

            <MenuItem
              component={Link}
              to="/categories"
              onClick={handleMenuClose}
            >
              {t('Categories')}
            </MenuItem>

            <MenuItem
              component={Link}
              to="/reviews"
              onClick={handleMenuClose}
            >
              {t('Reviews')}
            </MenuItem>

            <MenuItem
              component={Link}
              to="/cart"
              onClick={handleMenuClose}
            >
              {t('Cart')} ({cartCount})
            </MenuItem>

            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleMenuClose}
            >
              {t('Profile')}
            </MenuItem>

            <MenuItem
              onClick={() => {
                changeLanguage();
                handleMenuClose();
              }}
            >
              {i18n.language === 'ar' ? 'English' : 'العربية'}
            </MenuItem>

            <MenuItem
              onClick={() => {
                toggleMode();
                handleMenuClose();
              }}
            >
              {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </MenuItem>

            {!token ? (
              [
                <MenuItem
                  key="login"
                  component={Link}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  {t('Login')}
                </MenuItem>,

                <MenuItem
                  key="register"
                  component={Link}
                  to="/register"
                  onClick={handleMenuClose}
                >
                  {t('Register')}
                </MenuItem>,
              ]
            ) : (
              <MenuItem onClick={handleLogout}>
                {t('Logout')}
              </MenuItem>
            )}
          </Menu>

          {/* Desktop navigation links */}
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button color="inherit" component={Link} to="/">
              {t('Home')}
            </Button>

            <Button color="inherit" component={Link} to="/products">
              {t('Products')}
            </Button>

            <Button color="inherit" component={Link} to="/categories">
              {t('Categories')}
            </Button>

            <Button color="inherit" component={Link} to="/reviews">
              {t('Reviews')}
            </Button>

            <Button color="inherit" component={Link} to="/cart">
              {t('Cart')} ({cartCount})
            </Button>

            <Button color="inherit" component={Link} to="/profile">
              {t('Profile')}
            </Button>
          </Box>

          {/* Desktop language, theme, and account controls */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              flexShrink: 0,
            }}
          >
            <Button color="inherit" onClick={changeLanguage}>
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </Button>

            <Button color="inherit" onClick={toggleMode}>
              {mode === 'light' ? 'Dark' : 'Light'}
            </Button>

            {!token ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  {t('Login')}
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                >
                  {t('Register')}
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                {t('Logout')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}