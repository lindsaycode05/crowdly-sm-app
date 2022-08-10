import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Navbar = () => {
  let activeClassName = 'active';

  return (
    <AppBar position='static' sx={{paddingX:4,paddingY:1.4}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <NavLink
            style={{ textDecoration: 'none', color: 'white' }}
            to='/'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Home
          </NavLink>
        </Box>
        <Box>
          <Typography variant='h6' fontWeight='600'>Crowdly</Typography>
        </Box>
        <Box display='flex' gap={5}>
          <NavLink
            style={{ textDecoration: 'none', color: 'white' }}
            to='login'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Login
          </NavLink>
          <NavLink
            style={{ textDecoration: 'none', color: 'white' }}
            to='register'
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Register
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
