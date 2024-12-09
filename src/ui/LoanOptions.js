import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoanOptions({ loanType }) {
  const [formData, setFormData] = useState({
    file: null,
    email: '',
    name: '',
    creditscore: '',
    empstatus: '',
    address: '',
    age: '',
    loanType: loanType || '', // Initialize with loanType prop if provided
    phno:'',
  });

  useEffect(() => {
    // Set loanType from the prop and fetch email from localStorage
    setFormData((prevData) => ({
      ...prevData,
      loanType,
      email: localStorage.getItem('email') || '',
    }));
  }, [loanType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email and loan type
    if (!formData.email || !formData.loanType) {
      toast.error('Email or Loan Type is missing.');
      return;
    }

    // Validate file selection
    if (!formData.file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const data = new FormData();
    data.append('file', formData.file);
    data.append('email', formData.email);
    data.append('name', formData.name);
    data.append('creditscore', formData.creditscore);
    data.append('empstatus', formData.empstatus);
    data.append('address', formData.address);
    data.append('age', formData.age);
    data.append('loanType', formData.loanType);
    data.append('phno',formData.phno);

    try {
      const response = await axios.post('https://ingenious-expression-production.up.railway.app/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(response.data.message || 'Application submitted successfully!');
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // Show specific backend error message if available
        toast.error(error.response.data.message || 'Error submitting application.');
      } else {
        toast.error('Error connecting to the server.');
      }
      console.error('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: 'auto',
        padding: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: 3,
        backgroundColor: '#f9f9f9',
      }}
    >
      <ToastContainer />
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#006064', fontWeight: 600 }}>
        Apply for Loan
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Credit Score"
          name="creditscore"
          type="number"
          value={formData.creditscore}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Employment Status"
          name="empstatus"
          select
          value={formData.empstatus}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="Employed">Employed</MenuItem>
          <MenuItem value="Unemployed">Unemployed</MenuItem>
          <MenuItem value="Self-Employed">Self-Employed</MenuItem>
        </TextField>

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Loan Type"
          name="loanType"
          value={formData.loanType}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Phone Number"
          name="phno"
          type="number"
          value={formData.phno}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <Button variant="outlined" component="label" fullWidth sx={{ marginTop: 2 }}>
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }}>
          Submit Application
        </Button>
      </form>
    </Box>
  );
}
