import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { LoginSchema } from '../../validations/LoginSchema';
import { useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    
    const navigate = useNavigate();
    const [serverErrors, setServerErrors] = useState([]);
    const setToken = useAuthStore((state) => state.setToken);
    const { register,handleSubmit,formState: {errors,isSubmitting}} = useForm(
        {
            resolver:yupResolver(LoginSchema)
        }
    );
   
    const LoginForm = async(data) => {
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`, data);

            setToken(response.data.accessToken);
            navigate('/');

        } catch (err) {
            
            setServerErrors(err.response.data.errors)
        }
    }

    return (
        <Box component="section" className="LoginPage" sx={{
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
            px: '20px',
  flexDirection: 'column',
}}>
            
        <Typography
  component="h1"
  variant="h3"
  sx={{
    fontWeight: 700,
    textAlign: 'center',
    mb: '25px',
  }}
>
  Login
</Typography>


            {serverErrors?.length > 0 ? serverErrors.map((error) => (
                <Typography color="error">{error}</Typography>
            )) : ' '}

      <Box component="section" className="LoginPage" sx={{
  width: '100%',
  maxWidth: '450px',
}}>
       
          <Box component="form" onSubmit={handleSubmit(LoginForm)} sx={{
  p: '30px',
  borderRadius: '16px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}}>

                <TextField 
                    fullWidth 
                    {...register("email", { required: true })} 
                    label="email" 
                    variant="outlined" 
                    error={errors.email}
                    helperText={errors.email?.message} 
                />
               
              <TextField 
                    fullWidth 
                    {...register("password",{ required: true })} 
                    label="password" 
                    variant="outlined" 
                    error={errors.password}
                    helperText={errors.password?.message} 
              />


                    <Button  fullWidth sx={{
  py: '12px',
  textTransform: 'none',
  borderRadius: '8px',
}} variant="contained" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress/> : 'Login'}
              </Button>

          </Box>

            </Box>
            
        </Box>
  )
}