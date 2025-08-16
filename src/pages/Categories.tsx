import React, { useState } from 'react';
import { Box, Typography, Paper, Chip, Stack, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from '../contexts/ProductsContext';

const Categories: React.FC = () => {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryColors = ['primary', 'secondary', 'success', 'warning', 'info', 'error'] as const;
  const categoryMap: Record<string, number> = {};
  products.forEach((p) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });
  const categoriesWithColors = Object.entries(categoryMap).map(([name, count], index) => ({
    name,
    color: categoryColors[index % categoryColors.length],
    count,
  }));

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Categorias de Produtos
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Explore nossos produtos organizados por categoria. Cada categoria possui uma variedade de produtos cuidadosamente selecionados.
      </Typography>
      {loading ? (
        <Typography variant="h6" sx={{ color: 'text.secondary', mt: 4 }}>
          Carregando produtos...
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4, width: '100%' }}>
          {categoriesWithColors.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary', mt: 4 }}>
                Nenhuma categoria encontrada.
              </Typography>
            </Grid>
          ) : (
            categoriesWithColors.map((category) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.name} sx={{ display: 'flex' }}>
                <Paper
                  sx={{
                    p: 3,
                    width: '100%',
                    minHeight: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'left', wordBreak: 'break-word' }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, textAlign: 'left' }}>
                      Descubra uma ampla seleção de produtos de qualidade na categoria {category.name.toLowerCase()}.
                    </Typography>
                  </Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                    <Chip
                      label={`${category.count} produtos`}
                      color={category.color as any}
                      size="small"
                    />
                  </Stack>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Modal de produtos da categoria selecionada */}
      <Dialog
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Produtos da categoria: {selectedCategory}
          <IconButton onClick={() => setSelectedCategory(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {products.filter((p) => p.category === selectedCategory).length === 0 ? (
              <Grid size={{ xs: 12 }}>
                <Typography variant="body1" color="text.secondary">
                  Nenhum produto encontrado nesta categoria.
                </Typography>
              </Grid>
            ) : (
              products
                .filter((p) => p.category === selectedCategory)
                .map((product) => (
                  <Grid size={{ xs: 12 }} key={product.id}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 1,
                      background: '#fafbfc',
                      mb: 1
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        #{product.id} - {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        Estoque: {product.stock}
                      </Typography>
                    </Box>
                  </Grid>
                ))
            )}
          </Grid>
          </DialogContent>
              </Dialog>
            </Box>
          );
      };
      
      export default Categories;
      