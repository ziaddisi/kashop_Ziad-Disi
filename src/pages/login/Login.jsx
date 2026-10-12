import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import axios from 'axios';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoginSchema } from '../../validations/LoginSchema';
import useAuthStore from '../../store/useAuthStore';

import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [serverErrors, setServerErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const LoginForm = async (formData) => {
    setServerErrors([]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/Account/Login`,
        formData
      );

      if (!response.data?.accessToken) {
        setServerErrors(['The server did not return an access token.']);
        return;
      }

      setToken(response.data.accessToken);
      navigate('/');
    } catch (err) {
      const responseErrors = err.response?.data?.errors;

      if (Array.isArray(responseErrors)) {
        setServerErrors(responseErrors);
      } else if (responseErrors && typeof responseErrors === 'object') {
        setServerErrors(
          Object.values(responseErrors).flat().filter(
            (message) => typeof message === 'string'
          )
        );
      } else {
        setServerErrors([
          err.response?.data?.message ||
            'Login failed. Please check your details and try again.',
        ]);
      }
    }
  };

  return (
    <Box
      component="section"
      sx={{
        minHeight: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 3 },
        py: { xs: 4, md: 6 },
        boxSizing: 'border-box',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'action.hover',
              mb: 2,
            }}
          >
            <LockOutlinedIcon sx={{ fontSize: 30 }} />
          </Box>

          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              fontSize: { xs: '1.7rem', sm: '2rem' },
            }}
          >
            Login
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'center' }}
          >
            Welcome back to Kashop Store
          </Typography>
        </Box>

        {/* Server errors */}
        {serverErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverErrors.map((message, index) => (
              <Typography key={`${message}-${index}`} variant="body2">
                {message}
              </Typography>
            ))}
          </Alert>
        )}

        {/* Login form */}
        <Box
          component="form"
          onSubmit={handleSubmit(LoginForm)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <TextField
            fullWidth
            {...register('email')}
            label="Email"
            type="email"
            autoComplete="email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            {...register('password')}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      onClick={() => setShowPassword((previous) => !previous)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{
              py: 1.4,
              mt: 1,
              textTransform: 'none',
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Login'
            )}
          </Button>
        </Box>

        {/* Registration link */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Box
              component={Link}
              to="/register"
              sx={{
                fontWeight: 600,
                textDecoration: 'none',
                color: 'primary.main',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Register
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}