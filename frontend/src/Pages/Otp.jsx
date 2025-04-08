import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import backgroundImage from '../assets/background.jpeg';
import axios from 'axios';

const Otp = () => {
  const [language, setLanguage] = useState('English (United States)');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp: otpCode });
      setError('');
      navigate('/resetpassword', { state: { email } }); 
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#000033',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            color: 'white',
            marginBottom: '3rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            Tips
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.875rem', lineHeight: 1.5 }}>
            Lorem ipsum dolor sit amet consectetur. Vestibulum sit in cras
            tincidunt eget viverra tortor mus placerat elit. Libero amet odio
            lobortis commodo sapien purus eget. Porta ultrices.
            tincidunt eget viverra tortor mus placerat elit. Libero amet odio
            lobortis commodo sapien purus eget. Porta ultrices.
          </Typography>
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '9rem', marginTop: '1rem', width: '100%' }}>
          <FormControl variant="outlined" size="small" sx={{ width: '200px' }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              displayEmpty
              sx={{
                height: '40px',
                fontSize: '0.875rem',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e0e0e0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b0b0b0',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
              }}
            >
              <MenuItem value={'English (United States)'}>
                English (United States)
              </MenuItem>
              <MenuItem value={'Spanish'}>Spanish</MenuItem>
              <MenuItem value={'French'}>French</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            Don't have an account?{' '}
            <Button
              variant="contained"
              sx={{
                marginLeft: '8px',
                textTransform: 'none',
                backgroundColor: '#8BD4E7',
                color: 'black',
                fontSize: '0.875rem',
                borderRadius: '20px',
                padding: '6px 30px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#8BD4E7',
                  boxShadow: 'none',
                },
              }}
              component={Link}
              to="/"
            >
              Sign Up
            </Button>
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            padding: '2rem',
            maxWidth: '555px',
            width: '100%',
            border: '0.5px solid #66666659',
            borderRadius: '18px',
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Box
              component="div"
              sx={{
                width: '50px',
                height: '50px',
                backgroundColor: '#8BD4E7',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 2rem',
              }}
            >
              <Box
                component="div"
                sx={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#8BD4E7',
                  borderRadius: '50%',
                }}
              />
            </Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>
              OTP Verification
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
              Enter the OTP sent to {email}
            </Typography>
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  color: '#666',
                  mb: 1,
                  textAlign: 'left',
                  marginLeft: '3rem',
                }}
              >
                Enter Code
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {otp.map((digit, index) => (
                  <Grid item key={index}>
                    <TextField
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: 'center',
                          fontSize: '1.5rem',
                          width: '4rem',
                          height: '3.5rem',
                          padding: 0,
                        },
                      }}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '& fieldset': {
                            borderColor: '#e0e0e0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#b0b0b0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 0,
                backgroundColor: '#8BD4E7',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: '25px',
                boxShadow: 'none',
                py: 1.5,
                color: 'black',
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Otp;