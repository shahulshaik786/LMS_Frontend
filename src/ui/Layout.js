import React from 'react';
import Main from './main';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Main />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
