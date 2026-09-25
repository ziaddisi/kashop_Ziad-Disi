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
        <Box component="section" className="LoginPage">
            
        <Typography component="h1" variant="h2">
              Login {name}
        </Typography>



            {serverErrors?.length > 0 ? serverErrors.map((error) => (
                <Typography color="error">{error}</Typography>
            )) : ' '}

      <Box component="section" className="LoginPage">
       
          <Box component="form" onSubmit={handleSubmit(LoginForm)} sx={{marginTop:10}}>

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


              <Button variant="contained" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress/> : 'Login'}
              </Button>

          </Box>

            </Box>
            
        </Box>
  )
}