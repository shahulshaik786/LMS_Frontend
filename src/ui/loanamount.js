import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material'; // Import MUI Snackbar and Alert components

export default function LoanAmount() {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const { fullname } = location.state || {}; 

  const [formData, setFormData] = useState({
    fullname: fullname || "", 
    loanamount: "",
    tenure: "",
    identity: null,
    signature: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to store alert message
  const [alertSeverity, setAlertSeverity] = useState("success"); // State to set alert severity (success or error)

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullname: fullname || prev.fullname,
    }));
  }, [fullname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("loanamount", formData.loanamount);
    data.append("tenure", formData.tenure);
    data.append("identity", formData.identity);
    data.append("signature", formData.signature);

    try {
      const response = await axios.post("https://ingenious-expression-production.up.railway.app/loan/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success message in Snackbar
      setAlertMessage("Your loan application has been submitted successfully. We will review it shortly!");
      setAlertSeverity("success");
      setOpenSnackbar(true);
      console.log(response.data);
    } catch (error) {
      // Show error message in Snackbar
      setAlertMessage("Oops! Something went wrong. Please try again later.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
      console.error(error.response?.data || error.message);
    }
  };

  const handleBack = () => {
    navigate("https://ingenious-expression-production.up.railway.app/layout/applied-loans");
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Apply for a Loan</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="fullname" style={labelStyle}>Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              style={inputStyle}
              readOnly 
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="loanamount" style={labelStyle}>Loan Amount:</label>
            <input
              type="number"
              id="loanamount"
              name="loanamount"
              value={formData.loanamount}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="tenure" style={labelStyle}>Tenure (in months):</label>
            <input
              type="number"
              id="tenure"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="identity" style={labelStyle}>Identity Proof:</label>
            <input
              type="file"
              id="identity"
              name="identity"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              style={inputStyle}
              required
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="signature" style={labelStyle}>Signature:</label>
            <input
              type="file"
              id="signature"
              name="signature"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>Submit Application</button>
        </form>
        {/* Back button */}
        <button
          onClick={handleBack}
          style={{
            ...buttonStyle,
            backgroundColor: "#ccc",
            marginTop: "15px",
          }}
        >
          Back to Applied Loans
        </button>
      </div>

      {/* Snackbar Alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={alertSeverity} // Set severity based on the action
          sx={{ width: '100%' }}
        >
          {alertMessage} {/* Display the dynamic alert message */}
        </Alert>
      </Snackbar>
    </div>
  );
}

// Styles...
const wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f4f7fa", 
};

const containerStyle = {
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  padding: "30px",
  width: "100%",
  maxWidth: "600px",
  textAlign: "center",
};

const headingStyle = {
  color: "#333",
  fontSize: "1.5rem",
  marginBottom: "20px",
  fontWeight: "600",
};

const formGroupStyle = {
  marginBottom: "15px",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const labelStyle = {
  color: "#555",
  fontSize: "0.9rem",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "1rem",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#006064",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  width: "100%",
  transition: "background-color 0.3s ease",
};
