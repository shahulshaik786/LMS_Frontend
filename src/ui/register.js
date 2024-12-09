import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [status, setStatus] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [aadharno, setAadharno] = useState('');
  const [password, setPassword] = useState('');
  const [jobtitle, setJobtitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('ingenious-expression-production.up.railway.app/insert', {
        name: name,
        age: age,
        email: email,
        aadharno: aadharno,
        password: password,
        jobtitle: jobtitle,
      });
      if (response.status === 200) {
        setStatus(true);
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align to the left
    paddingLeft: '2rem', // Add some left padding
  };

  const backgroundStyle = {
    backgroundImage: 'url(https://img.freepik.com/free-photo/financial-income-economic-diagram-money-concept_53876-121065.jpg?size=626&ext=jpg&ga=GA1.1.2076430500.1706848681&semt=ais_hybrid)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  };

  const boxStyle = {
    padding: '1.5rem', // Reduced padding to decrease length
    borderRadius: '12px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 1,
    width: '100%', 
    maxWidth: '400px',
  };

  const titleStyle = {
    marginBottom: '1rem', // Reduced margin
    color: '#4A90E2',
    textAlign: 'center', // Center the title
  };

  const inputStyle = {
    marginBottom: '0.5rem', // Reduced margin for inputs
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#4A90E2',
      },
      '&:hover fieldset': {
        borderColor: '#0056b3',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0056b3',
      },
    },
  };

  const buttonStyle = {
    marginTop: '1rem',
    backgroundColor: '#4A90E2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <Box sx={containerStyle}>
      <Box sx={backgroundStyle} />
      <Box sx={boxStyle}>
        <Typography variant="h5" sx={titleStyle}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Name"
            id='name' 
            margin="normal" 
            required 
            sx={inputStyle} 
            variant="outlined"
            onChange={(e) => { setName(e.target.value); }}
          />
          <TextField 
            fullWidth 
            label="Age" 
            id='age'
            type="number" 
            margin="normal" 
            required 
            sx={inputStyle} 
            variant="outlined"
            onChange={(e) => { setAge(e.target.value); }}
          />
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            id='email'
            margin="normal" 
            required 
            sx={inputStyle} 
            variant="outlined"
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <TextField 
            fullWidth 
            label="Aadhaar Number" 
            type="text" 
            id='aadharno'
            inputProps={{ pattern: "\\d{12}" }} 
            margin="normal" 
            title="Aadhaar number must be 12 digits." 
            required 
            sx={inputStyle} 
            variant="outlined"
            onChange={(e) => { setAadharno(e.target.value); }}
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            id='password'
            margin="normal" 
            required 
            sx={inputStyle} 
            variant="outlined"
            onChange={(e) => { setPassword(e.target.value); }}
          />
          <TextField 
            fullWidth 
            label="Job Title" 
            id='jobtitle'
            margin="normal" 
            required 
            sx={inputStyle} 
            variant="outlined"
            onChange={(e) => { setJobtitle(e.target.value); }}
          />
          <Button 
            variant="contained" 
            type="submit" 
            fullWidth 
            sx={buttonStyle}
          >
            Register
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
            Already have an account? 
            <Button 
              onClick={() => navigate('/login')} 
              color="primary" 
              style={{ textDecoration: 'underline', padding: 0 }}>
              Login
            </Button>
          </Typography>
          {status && <Alert severity="success"> Registered successfully</Alert>}
        </form>
      </Box>
    </Box>
  );
}
