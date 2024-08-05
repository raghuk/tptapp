import * as React from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import AppBar from '../../shared/components/layout/appBar';
import AppDrawer from '../../shared/components/layout/appDrawer';
import AppNav from '../../shared/components/layout/appNav';
import AppSearch from '../../shared/components/layout/appSearch';

import UserPopover from './components/userPopover';

import '../../theme/index.scss';


const Layout = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => { setOpen(!open); };

  return (
    <>
      <AppBar position='fixed' open={open}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge='start' color='inherit' aria-label='open drawer' onClick={toggleDrawer}
            sx={{ ml: '-8px', mr: '36px', ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>Transport and Insurance Portal</Typography>

          <AppSearch />

          <IconButton color='inherit' sx={{ ml: '7px', mr: '20px' }}>
            <Badge badgeContent={4} color='secondary'><NotificationsIcon /></Badge>
          </IconButton>

          <UserPopover />
        </Toolbar>
      </AppBar>

      <AppDrawer variant='permanent' open={open}>
        <Box component='nav' sx={{ height: '100%', backgroundColor: '#FFFFFF' }}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#FFFFFF', px: [1] }}>
            <IconButton onClick={toggleDrawer}><ChevronLeftIcon /></IconButton>
          </Toolbar>

          <Divider />

          <AppNav />
        </Box>
      </AppDrawer>

      <Box component='main' className='app-layout'>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
