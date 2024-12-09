import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
  Modal,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const approvedLoans = [
  { id: 1, loanType: 'Personal Loan', amount: 50000, interest: 5, tenure: 12 },
  { id: 2, loanType: 'Car Loan', amount: 200000, interest: 7, tenure: 24 },
  { id: 3, loanType: 'Home Loan', amount: 1000000, interest: 8, tenure: 120 },
];

export default function Repayment() {
  const [loans, setLoans] = useState(() => {
    // Load data from localStorage or initialize with approvedLoans
    const storedLoans = localStorage.getItem('loans');
    if (storedLoans) {
      return JSON.parse(storedLoans);
    }
    return approvedLoans.map((loan) => ({
      ...loan,
      installments: calculateInstallment(loan.amount, loan.interest, loan.tenure),
      paid: 0,
    }));
  });

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Update localStorage whenever loans state changes
    localStorage.setItem('loans', JSON.stringify(loans));
  }, [loans]);

  function calculateInstallment(amount, interest, tenure) {
    const monthlyInterestRate = interest / 100 / 12;
    return ((amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -tenure))).toFixed(2);
  }

  const handlePayClick = (loan) => {
    setSelectedLoan(loan);
    setPayAmount('');
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    const updatedLoans = loans.map((loan) =>
      loan.id === selectedLoan.id
        ? {
            ...loan,
            paid: loan.paid + parseFloat(payAmount),
          }
        : loan
    );
    setLoans(updatedLoans);
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Repayment Page
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Loan Type</strong></TableCell>
              <TableCell><strong>Total Amount</strong></TableCell>
              <TableCell><strong>Installment</strong></TableCell>
              <TableCell><strong>Paid Amount</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.loanType}</TableCell>
                <TableCell>₹{loan.amount}</TableCell>
                <TableCell>₹{loan.installments}</TableCell>
                <TableCell>₹{loan.paid}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handlePayClick(loan)}>
                    Pay
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Payment */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Pay Installment for {selectedLoan?.loanType}
          </Typography>
          <TextField
            label="Enter Amount"
            variant="outlined"
            fullWidth
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            type="number"
            sx={{ marginBottom: 3 }}
          />
          {payAmount && (
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
              <QRCodeCanvas
                value={`upi://pay?pa=8977799007@ybl&pn=Loan Repayment&am=${payAmount}&cu=INR`}
                size={200}
              />
              <Typography variant="caption" display="block">
                Scan to Pay ₹{payAmount}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!payAmount || parseFloat(payAmount) <= 0}
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
