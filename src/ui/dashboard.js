import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [loanCount, setLoanCount] = useState(null); // Initial value as `null`
  const [acceptedLoanCount, setAcceptedLoanCount] = useState(null);
  const [rejectedLoanCount, setRejectedLoanCount] = useState(null);
  useEffect(() => {
    const storedLoanCount = localStorage.getItem('loanCount');
    const storedAcceptedLoanCount = localStorage.getItem('acceptedLoanCount');
    const storedRejectedLoanCount = localStorage.getItem('rejectedLoanCount');
    
    if (storedLoanCount) {
      setLoanCount(Number(storedLoanCount)); // Convert the string to a number
    }
    if (storedAcceptedLoanCount) {
      setAcceptedLoanCount(Number(storedAcceptedLoanCount)); // Convert the string to a number
    }
    if (storedRejectedLoanCount) {
      setRejectedLoanCount(Number(storedRejectedLoanCount)); // Convert the string to a number
    }
  }, []);

  const renderLoanCount = (count) => {
    if (count === null) return 'Loading...'; // If not yet loaded
    return count;
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 5000, 4200, 5300],
        fill: false,
        borderColor: '#4A90E2',
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: ['Personal Loans', 'Home Loans', 'Car Loans', 'Education Loans'],
    datasets: [
      {
        label: 'Loans',
        data: [300, 500, 400, 700],
        backgroundColor: ['#4A90E2', '#34c38f', '#f46a6a', '#f1b44c'],
      },
    ],
  };

  const creditScoreData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Credit Score',
        data: [720, 740, 750, 780, 800, 810],
        fill: false,
        borderColor: '#4A90E2',
        tension: 0.1,
      },
    ],
  };

  const cardStyle = {
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box sx={{ padding: 5, backgroundColor: '#006064', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" sx={{ color: 'white', fontWeight: 600 }}>
        Dashboard
        </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Applied Loans</Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {loanCount} {/* Display the dynamic count */}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Accepted Loans</Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {acceptedLoanCount} {/* Display accepted loans count */}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper style={cardStyle}>
            <Typography variant="h6">Rejected Loans</Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {rejectedLoanCount} {/* Display rejected loans count */}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 5 }}>
  <Grid item xs={12} md={6}>
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 3 }}>
        Credit Score Over Time
      </Typography>
      <Line data={creditScoreData} />
    </Paper>
  </Grid>
  <Grid item xs={12} md={6}>
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" align="center" sx={{ marginBottom: 3 }}>
        Loan Types Distribution
      </Typography>
      <Bar data={barData} />
    </Paper>
  </Grid>
</Grid>


      
    </Box>
  );
}
