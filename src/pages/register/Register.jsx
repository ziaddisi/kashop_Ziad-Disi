import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../validations/RegisterSchema';
import { useState } from 'react';


export default function Register() {
    const [serverErrors, setServerErrors] = useState([]);
    const { register,handleSubmit,formState: {errors,isSubmitting}} = useForm(
        {
            resolver:yupResolver(registerSchema)
        }
    );
    
    const RegisterForm = async(data) => {
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`,data);
            console.log(response);

        } catch (err) {
            
            setServerErrors(err.response.data.errors)
        }
    }

    return (
        <Box component="section" className="registerPage" sx={{
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  px: '20px',
}}>
            
        <Typography component="h1" variant="h2" sx={{
  fontWeight: 700,
  textAlign: 'center',
  mb: '25px',
}}>
              Register
        </Typography>

            {console.log(serverErrors)}

            {serverErrors?.length > 0 ? serverErrors.map((error) => (
                <Typography color="error">{error}</Typography>
            )) : ' '}

      <Box component="section" className="registerPage" sx={{
  width: '100%',
  maxWidth: '500px',
}}>
       
          <Box component="form" onSubmit={handleSubmit(RegisterForm)} sx={{
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

              <TextField 
                    fullWidth 
                    {...register("userName",{ required: true })} 
                    label="userName" 
                    variant="outlined" 
                    error={errors.userName}
                    helperText={errors.userName?.message} 
              />

              <TextField 
                    fullWidth 
                    {...register("fullName",{ required: true })} 
                    label="fullName" 
                    variant="outlined" 
                    error={errors.fullName}
                    helperText={errors.fullName?.message} 
              />

              <TextField 
                    fullWidth 
                    {...register("phoneNumber",{ required: true })} 
                    label="phoneNumber" 
                    variant="outlined" 
                    error={errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
              />

              <Button fullWidth variant="contained" type="submit" disabled={isSubmitting}  sx={{
  py: '12px',
  textTransform: 'none',
  borderRadius: '8px',
}}>
                    {isSubmitting ? <CircularProgress/> : 'register'}
              </Button>

          </Box>

            </Box>
            
        </Box>
  )
}