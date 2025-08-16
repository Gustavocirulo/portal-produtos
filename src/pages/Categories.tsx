import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box, Typography, Paper, Chip, Stack } from '@mui/material';

interface CategoriesLoaderData {
  categories: string[];
}

function Categories() {
  const { categories } = useLoaderData() as CategoriesLoaderData;

  // Simula cores para as categorias (em um app real, isso viria do backend)
  const categoryColors = ['primary', 'secondary', 'success', 'warning', 'info', 'error'] as const;
  
  const categoriesWithColors = categories.map((category, index) => ({
    name: category,
    color: categoryColors[index % categoryColors.length],
    count: Math.floor(Math.random() * 20) + 5 // Simula quantidade de produtos
  }));

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Categorias de Produtos
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Explore nossos produtos organizados por categoria. Cada categoria possui uma 
        variedade de produtos cuidadosamente selecionados.
      </Typography>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)' 
          }, 
          gap: 3,
          mb: 4
        }}
      >
        {categoriesWithColors.map((category, index) => (
          <Paper 
            key={category.name}
            sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {category.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Descubra uma ampla seleção de produtos de qualidade na categoria {category.name.toLowerCase()}.
              </Typography>
            </Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Chip 
                label={`${category.count} produtos`}
                color={category.color as any}
                size="small"
              />
            </Stack>
          </Paper>
        ))}
      </Box>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Estatísticas
        </Typography>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              md: 'repeat(4, 1fr)' 
            }, 
            gap: 2
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {categoriesWithColors.reduce((sum, cat) => sum + cat.count, 0)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total de Produtos
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
              {categories.length}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Categorias
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
              {Math.round(categoriesWithColors.reduce((sum, cat) => sum + cat.count, 0) / categoriesWithColors.length)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Média por Categoria
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
              {Math.max(...categoriesWithColors.map(cat => cat.count))}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Maior Categoria
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Categories;
