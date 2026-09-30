import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCart from '../../hooks/useCart';
import useAuthStore from '../../store/useAuthStore';
import i18n from '../../i18next';
import useThemeStore from '../../hooks/useThemeStore';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
const [anchorEl, setAnchorEl] = useState(null);

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const { data } = useCart();
  const cartCount = data?.items?.length || 0;

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const { mode, toggleMode } = useThemeStore();
  return (
    <Box  sx={{
    flexGrow: 1,
    display: {
      xs: 'none',
      md: 'flex',
    },
  }} >
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#f5f5f7', color: 'black',boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 4,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Kashop Store
          </Typography>
<IconButton
  color="inherit"
  onClick={handleMenuOpen}
  sx={{
    display: {
      xs: 'flex',
      md: 'none',
    },
    ml: 'auto',
  }}
>
  <MenuIcon />
          </IconButton>
          <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
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
</Menu>
          
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              {t('Home')}
            </Button>

            <Button color="inherit" component={Link} to="/products">
              {t('Products')}
            </Button>

            <Button color="inherit" component={Link} to="/categories">
              {t('Categories')}
            </Button>

            <Button color="inherit" component={Link} to="/cart">
              {t('Cart')} ({cartCount})
            </Button>

            <Button color='inherit' component={Link} to="/profile">
              {t('Profile')}</Button>
            {/* <Button color='inherit' component={Link} to="/profile/orders">
              {t('ProfileOrders')}</Button>                      */}
          </Box>
               <Button color="inherit" onClick={changeLanguage}>
            {i18n.language === 'ar' ? 'EN' : 'AR'}
          </Button>
          <Button onClick={toggleMode} color='inherit'> {mode == "light" ? "Dark": "Light"} </Button> 

          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                {t('Login')}
              </Button>
             
              <Button color="inherit" component={Link} to="/register">
                {t('Register')}
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              {t('Logout')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}