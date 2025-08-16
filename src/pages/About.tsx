import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Sobre o Portal de Produtos
      </Typography>
      
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Nossa Missão
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            O Portal de Produtos foi desenvolvido para facilitar a busca e visualização 
            de produtos de forma intuitiva e eficiente. Nossa plataforma oferece uma 
            interface moderna e responsiva para melhor experiência do usuário.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Funcionalidades
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Busca de produtos por código
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Visualização detalhada de produtos
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Interface responsiva e moderna
          </Typography>
          <Typography variant="body1">
            • Navegação intuitiva entre páginas
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Tecnologias Utilizadas
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • React com TypeScript
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Material-UI para interface
          </Typography>
          <Typography variant="body1">
            • React Router para navegação
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default About;
