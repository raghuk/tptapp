import { createTheme } from '@mui/material/styles';

import { palette } from './palette';
import { shadows, customShadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';


const theme = createTheme(
  ({
    palette: palette(),
    typography,
    shadows: shadows(),
    customShadows: customShadows(),
    shape: { borderRadius: 6 },
  })
);

theme.components = overrides(theme);

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#134B70',
//     },
//     secondary: {
//       main: '#7776B3',
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });

export default theme;
