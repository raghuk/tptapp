import * as React from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const AppCopyright = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='http://brahmakumaris.com/'>Brahma Kumaris</Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};


export default AppCopyright;
