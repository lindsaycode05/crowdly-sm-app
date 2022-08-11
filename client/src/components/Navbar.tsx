import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { AuthContext } from '../context/auth';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navBar = user ? (
    <AppBar position='static' sx={{ paddingX: 4, paddingY: 1.4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography
            sx={{ textDecoration: 'none', color: 'white', fontSize: 17 }}
          >
            {/* 
            // @ts-ignore */}
            Welcome back, {user.username}
          </Typography>
        </Box>
        <Box>
          <Typography variant='h4' fontWeight='600'>
            Crowdly
          </Typography>
        </Box>
        <Box display='flex'>
          <Button
            style={{
              textDecoration: 'none',
              textTransform: 'capitalize',
              fontSize: 17,
              color: 'white',
            }}
            onClick={logout}
          >
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar position='static' sx={{ paddingX: 4, paddingY: 1.4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <NavLink
            style={{ textDecoration: 'none', color: 'white', fontSize: 17 }}
            to='/'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Home
          </NavLink>
        </Box>
        <Box>
          <Typography variant='h4' fontWeight='600'>
            Crowdly
          </Typography>
        </Box>
        <Box display='flex' gap={5}>
          <NavLink
            style={{ textDecoration: 'none', color: 'white', fontSize: 17 }}
            to='login'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Log in
          </NavLink>
          <NavLink
            style={{ textDecoration: 'none', color: 'white', fontSize: 17 }}
            to='register'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Register
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );

  return navBar;
};

export default Navbar;
