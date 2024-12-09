import React, { createContext, useState } from 'react';

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const [loanStats, setLoanStats] = useState({
    totalLoans: 0,
    acceptedLoans: 0,
    rejectedLoans: 0,
  });

  return (
    <LoanContext.Provider value={{ loanStats, setLoanStats }}>
      {children}
    </LoanContext.Provider>
  );
};
