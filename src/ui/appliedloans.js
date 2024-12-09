import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

export default function AppliedLoans() {
  const [appliedLoans, setAppliedLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [loanCount, setLoanCount] = useState(0);
  const [acceptedLoanCount, setAcceptedLoanCount] = useState(0);
  const [rejectedLoanCount, setRejectedLoanCount] = useState(0);
  const [loanTypeCounts, setLoanTypeCounts] = useState({
    personal: 0,
    home: 0,
    car: 0,
    education: 0
  });

  // Fetch the email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.error('User email is not found in localStorage.');
    }
  }, []);

  // Fetch loans
  useEffect(() => {
    const fetchLoans = async () => {
      if (!email) {
        console.error('User email is not provided');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`ingenious-expression-production.up.railway.app/userloans?email=${email}`);
        setAppliedLoans(response.data || []);

        const acceptedLoans = response.data.filter(loan => loan.status === 'accepted').length;
        const rejectedLoans = response.data.filter(loan => loan.status === 'rejected').length;

        // Count loan types
        const loanTypes = { personal: 0, home: 0, car: 0, education: 0 };
        response.data.forEach(loan => {
          if (loan.loanType === 'Personal Loan') loanTypes.personal++;
          if (loan.loanType === 'Home Loan') loanTypes.home++;
          if (loan.loanType === 'Car Loan') loanTypes.car++;
          if (loan.loanType === 'Education Loan') loanTypes.education++;
        });

        setLoanTypeCounts(loanTypes);
        setLoanCount(response.data.length);
        setAcceptedLoanCount(acceptedLoans);
        setRejectedLoanCount(rejectedLoans);

        // Store data in localStorage
        localStorage.setItem('loanCount', response.data.length);
        localStorage.setItem('acceptedLoanCount', acceptedLoans);
        localStorage.setItem('rejectedLoanCount', rejectedLoans);
        localStorage.setItem('loanTypeCounts', JSON.stringify(loanTypes));

      } catch (error) {
        console.error('Error fetching applied loans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [email]);

  // View PDF function
  const viewPdf = async (email, loanType) => {
    try {
      const response = await axios.get(`ingenious-expression-production.up.railway.app/api/pdf/view/${email}/${loanType}`, {
        responseType: 'blob',
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setSelectedPdfUrl(fileURL);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };

  // Proceed to next action
  const handleProceed = (loan) => {
    console.log('Proceeding with loan:', loan);
    window.location.href = '/loanamount';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdfUrl('');
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h6">Loading your applied loans...</Typography>
      </Box>
    );
  }

  if (appliedLoans.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h6">You have not applied for any loans yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 5, backgroundColor: '#006064', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white', fontWeight: 600 }}>
        Your Applied Loans
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Loan Type</strong></TableCell>
              <TableCell><strong>Applicant Name</strong></TableCell>
              <TableCell><strong>Credit Score</strong></TableCell>
              <TableCell><strong>Employment Status</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Phone Number</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliedLoans.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>{loan.loanType}</TableCell>
                <TableCell>{loan.name}</TableCell>
                <TableCell>{loan.creditscore}</TableCell>
                <TableCell>{loan.empstatus}</TableCell>
                <TableCell>{loan.age}</TableCell>
                <TableCell>{loan.address}</TableCell>
                <TableCell>{loan.phno}</TableCell>
                <TableCell>{loan.status || 'Pending'}</TableCell>
                <TableCell>
                  {loan.status === 'Accepted' ? (
                    <button
                      style={{
                        backgroundColor: '#34c38f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleProceed(loan)}
                    >
                      Proceed
                    </button>
                  ) : (
                    <IconButton color="primary" onClick={() => viewPdf(loan.email, loan.loanType)}>
                      <VisibilityIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup for PDF Viewer */}
      {isModalOpen && (
        <div style={popupOverlayStyle}>
          <div style={popupContainerStyle}>
            <div style={popupHeaderStyle}>
              <Typography variant="h6">PDF Viewer</Typography>
              <button style={closeButtonStyle} onClick={closeModal}>✖</button>
            </div>
            <iframe src={selectedPdfUrl} style={iframeStyle} title="PDF Viewer" />
          </div>
        </div>
      )}
    </Box>
  );
}

// Popup styles
const popupOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupContainerStyle = {
  backgroundColor: 'white',
  width: '80%',
  maxWidth: '800px',
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
};

const popupHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  borderBottom: '1px solid #ddd',
  backgroundColor: '#f5f5f5',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#333',
};

const iframeStyle = {
  width: '100%',
  height: '600px',
  border: 'none',
};
