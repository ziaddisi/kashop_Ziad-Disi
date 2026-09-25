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

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
            iPhone Store
          </Typography>

          <Button color="inherit" onClick={changeLanguage}>
            {i18n.language === 'ar' ? 'EN' : 'AR'}
          </Button>

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
          </Box>

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