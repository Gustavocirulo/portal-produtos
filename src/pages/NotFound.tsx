import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'text.secondary' }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Página não encontrada
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          A página que você está procurando não existe ou foi movida.
        </Typography>
      </Paper>
    </Box>
  );
};

export default NotFound;
