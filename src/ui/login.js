import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            localStorage.clear();
            const response = await axios.post('https://ingenious-expression-production.up.railway.app/login', {
                email: email,
                password: password,
            });
            if (response.data === "Login Successfull") {
                setStatus('success');
                localStorage.setItem('email',email);
                navigate('/layout/dashboard');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const containerStyle = {
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 1,
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
    };

    const titleStyle = {
        marginBottom: '1.5rem',
        color: '#4A90E2',
    };

    const inputStyle = {
        marginBottom: '1rem',
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
                <Typography variant="h5" align="center" sx={titleStyle}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        id="email"
                        margin="normal"
                        required
                        sx={inputStyle}
                        variant="outlined"
                        onChange={(e) => { setEmail(e.target.value); }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        margin="normal"
                        required
                        sx={inputStyle}
                        variant="outlined"
                        onChange={(e) => { setPassword(e.target.value); }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={buttonStyle}
                    >
                        Login
                    </Button>
                    <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
                        Don't have an account? 
                        <Button 
                            onClick={() => navigate('/register')} 
                            color="primary" 
                            style={{ textDecoration: 'underline', padding: 0 }}>
                            Register
                        </Button>
                    </Typography>
                    {status === 'success' && 
                        <Alert severity="success" sx={{ marginTop: '1rem' }}>
                            Logged in successfully!
                        </Alert>}
                    {status === 'error' && 
                        <Alert severity="error" sx={{ marginTop: '1rem' }}>
                           Login failed. Please try again.
                        </Alert>}
                </form>
            </Box>
        </Box>
    );
}
