import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Grid, Dialog, DialogContent } from '@mui/material';
import LoanOptions from './LoanOptions'; // Assuming LoanOptions is a separate component

const loanTypes = [
  {
    title: "Personal Loans",
    description: "Flexible loans for personal use.",
    imageUrl: "https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/blog/personal-loan/5-ways-you-can-use-a-personal-loan-for-career-development-717x404.jpg",
  },
  {
    title: "Home Loans",
    description: "Loans to buy your dream home.",
    imageUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Car Loans",
    description: "Finance your next vehicle.",
    imageUrl: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Education Loans",
    description: "Support your educational.",
    imageUrl: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2016/10/24/513072-student-loan-thinkstockphotos-102316.jpg",
  },
];

export default function ApplyLoan() {
  const [open, setOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('');

  const handleClickOpen = (loanType) => {
    setSelectedLoanType(loanType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLoanType('');  // Clear the loan type when closing
  };

  return (
    <Box sx={{
      textAlign: 'center',
      p: 5,
      backgroundColor: '#e0f7fa',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
        Apply for Loans Here..!
      </Typography>

      {/* Parent Card to wrap all loan options */}
      <Card sx={{ maxWidth: 1500, margin: 'auto', padding: 3, borderRadius: 3, boxShadow: 3,backgroundColor:'#006064' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
            Choose a Loan Type
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {loanTypes.map((loan, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={loan.imageUrl}
                    alt={loan.title}
                    sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
                      {loan.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {loan.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: 2 }}
                      onClick={() => handleClickOpen(loan.title)}
                    >
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center', color: '#777' }}>
        <Typography variant="body2">© PARSA UDAY KUMAR | All Rights Reserved</Typography>
      </Box>

      {/* Dialog for Loan Options */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          {/* Passing selected loan type to LoanOptions component */}
          <LoanOptions loanType={selectedLoanType} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
