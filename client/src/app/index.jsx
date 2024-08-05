import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './routes/auth/authProvider';
import RoutePaths from './routes/index.jsx';

import { store } from './redux/store';
import theme from './theme/theme.js';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RoutePaths />
          </ThemeProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
