import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ProductsProvider } from './contexts/ProductsContext';
import { router } from './Routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App;
