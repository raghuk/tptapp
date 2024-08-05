import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { increment, decrement, selectCount, selectStatus } from '../../reducers/counterSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Counter = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);


  return (
    <Box component='div' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant='contained' onClick={() => dispatch(decrement())}>-</Button>

      <Typography component='h1' variant='h5' color='text.secondary' align='center' sx={{ width: '100px' }}>{ count }</Typography>

      <Button variant='contained' onClick={() => dispatch(increment())}>+</Button>
    </Box>
  );
};


export default Counter;
