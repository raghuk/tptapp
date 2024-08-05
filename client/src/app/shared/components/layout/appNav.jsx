import * as React from 'react';
import { NavLink } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';


const AppNav = () => {
  return (
    <List className='app-sidemenu'>
      <ListItem sx={{ mb: [2] }}>
        <NavLink to='/' className={({isActive}) => (isActive ? 'active' : 'none')}>
          <ListItemIcon sx={{ px: [1] }}><HomeIcon color='primary' fontSize='medium' /></ListItemIcon>
          <ListItemText primary='Dashboard' />
        </NavLink>
      </ListItem>

      <ListItem sx={{ mb: [2] }}>
        <NavLink to='/fuel' className={({isActive}) => (isActive ? 'active' : 'none')}>
          <ListItemIcon sx={{ px: [1] }}><LocalGasStationIcon color='primary' fontSize='medium' /></ListItemIcon>
          <ListItemText primary='Fuel Print' />
        </NavLink>
      </ListItem>

      <ListItem sx={{ mb: [2] }}>
        <NavLink to='/about' className={({isActive}) => (isActive ? 'active' : 'none')}>
          <ListItemIcon sx={{ px: [1] }}><InfoIcon color='primary' fontSize='medium' /></ListItemIcon>
          <ListItemText primary='About' />
        </NavLink>
      </ListItem>
    </List>
  );
};


export default AppNav;
