import * as React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { get } from 'lodash-es';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { login } from '../../core/services/auth.service';
import { useAuth } from '../../routes/auth/authProvider';


const schema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 chars length'),
});


const Login = () => {
  const { loginUser } = useAuth();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = JSON.stringify(values, null, 2);

      login(data).then((resp) => {
        const user = get(resp.data, 'user', {});
        const roles = get(resp.data, 'roles', []);

        loginUser(user, roles);
      })
      .catch((error) => { console.log(error); });
    },
  });


  return (
    <section className='app-login'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '400px', margin: '40px auto 0' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><LockOutlinedIcon /></Avatar>

        <Typography component='h1' variant='h5'>Sign in</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField type='text' label='Username' name='username' margin='normal' fullWidth autoComplete='off' autoFocus
            onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField type='password' label='Password' name='password' margin='normal' fullWidth autoComplete='off'
            onChange={formik.handleChange} onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button color='secondary' type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>Sign In</Button>
        </form>
      </Box>
    </section>
  );
};

export default Login;
