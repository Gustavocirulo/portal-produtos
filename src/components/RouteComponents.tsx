import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// Componente de Loading para as rotas
export const RouteLoader: React.FC = () => (
  <Box 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    minHeight="400px"
    gap={2}
  >
    <CircularProgress size={60} />
    <Typography variant="h6" color="text.secondary">
      Carregando...
    </Typography>
  </Box>
);

// Componente de Error Boundary para as rotas
export const RouteErrorBoundary: React.FC<{ error?: any }> = ({ error }) => (
  <Box 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    minHeight="400px"
    gap={2}
    p={4}
  >
    <Typography variant="h4" color="error" gutterBottom>
      Ops! Algo deu errado
    </Typography>
    <Typography variant="body1" color="text.secondary" textAlign="center">
      {error?.message || 'Ocorreu um erro inesperado. Tente recarregar a página.'}
    </Typography>
    <Box mt={2}>
      <button 
        onClick={() => window.location.reload()}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Recarregar Página
      </button>
    </Box>
  </Box>
);
