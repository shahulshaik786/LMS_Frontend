import React from 'react';
import './App.css';
import Register from './ui/register';
import Login from './ui/login';
import Home from './ui/home';
import Layout from './ui/Layout';
import Applyloans from './ui/applyloans';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appliedloans from './ui/appliedloans';
import Loanhistory from './ui/loanhistory';
import Adminlogin from './ui/adminlogin';
import Adminhome from './ui/adminhome';
import Dashboard from './ui/dashboard';
import Repayment from './ui/repayment';
import Support from './ui/support';
import LoanAmount from './ui/loanamount';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/admin-login' element={<Adminlogin/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/adminpage"element={<Adminhome/>}/>
          <Route path="/loanamount"element={<LoanAmount/>}/>
          {/* Routes with Sidebar */}
          <Route path="/layout" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="applied-loans" element={<Appliedloans/>} />
            <Route path="applyloans" element={<Applyloans />} />
            <Route path="loan-history" element={<Loanhistory/>} />
            <Route path="repayment-schedule" element={<Repayment/>} />
            <Route path="settings" element={<div>Settings Page</div>} />
            <Route path="support" element={<Support/>} />
          </Route>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
