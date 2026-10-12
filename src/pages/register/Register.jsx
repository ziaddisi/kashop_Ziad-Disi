import { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import axios from 'axios';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import { registerSchema } from '../../validations/RegisterSchema';

export default function Register() {
  const [serverErrors, setServerErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const RegisterForm = async (formData) => {
    setServerErrors([]);
    setSuccessMessage('');

    try {
      await axios.post(
        `${import.meta.env.VITE_BURL}/auth/Account/Register`,
        formData
      );

      setSuccessMessage(
        'Your account has been created successfully. You can now log in.'
      );
    } catch (err) {
      const responseErrors = err.response?.data?.errors;

      if (Array.isArray(responseErrors)) {
        setServerErrors(responseErrors);
      } else if (
        responseErrors &&
        typeof responseErrors === 'object'
      ) {
        setServerErrors(
          Object.values(responseErrors)
            .flat()
            .filter((message) => typeof message === 'string')
        );
      } else {
        setServerErrors([
          err.response?.data?.message ||
            'Registration failed. Please check your information and try again.',
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
          maxWidth: 500,
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
            <PersonAddOutlinedIcon sx={{ fontSize: 30 }} />
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
            Create Account
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1, textAlign: 'center' }}
          >
            Join Kashop Store today
          </Typography>
        </Box>

        {/* Server feedback */}
        {serverErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverErrors.map((message, index) => (
              <Typography key={`${message}-${index}`} variant="body2">
                {message}
              </Typography>
            ))}
          </Alert>
        )}

        {successMessage && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            }
          >
            {successMessage}
          </Alert>
        )}

        {/* Registration form */}
        <Box
          component="form"
          onSubmit={handleSubmit(RegisterForm)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <TextField
            fullWidth
            {...register('fullName')}
            label="Full Name"
            autoComplete="name"
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
          />

          <TextField
            fullWidth
            {...register('userName')}
            label="Username"
            autoComplete="username"
            error={Boolean(errors.userName)}
            helperText={errors.userName?.message}
          />

          <TextField
            fullWidth
            {...register('email')}
            label="Email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            {...register('phoneNumber')}
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            fullWidth
            {...register('password')}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
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
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
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
            disabled={isSubmitting || Boolean(successMessage)}
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
              'Create Account'
            )}
          </Button>
        </Box>

        {/* Login link */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Box
              component={Link}
              to="/login"
              sx={{
                fontWeight: 600,
                textDecoration: 'none',
                color: 'primary.main',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Login
            </Box>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}