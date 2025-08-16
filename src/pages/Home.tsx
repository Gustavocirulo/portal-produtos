import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { Product } from '../contexts/ProductsContext';

interface HomeLoaderData {
  products: Product[];
}

function Home() {
  const { products } = useLoaderData() as HomeLoaderData;
  const [code, setCode] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilter = () => {
    if (!code) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => String(p.id) === code.trim());
      setFilteredProducts(filtered);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Portal de Produtos
        </Typography>
        <Button
          component={Link}
          to="/novo-produto"
          variant="contained"
          size="large"
        >
          Novo Produto
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <TextField
          label="Código"
          variant="outlined"
          size="small"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          sx={{ width: 200 }}
        />
        <Button variant="contained" onClick={handleFilter} sx={{ height: 40 }}>
          Filtrar
        </Button>
      </Box>
      
      <Stack spacing={3}>
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" sx={{ color: 'text.secondary', mt: 4 }}>
            {code ? 'Nenhum produto encontrado com este código.' : 'Nenhum produto disponível.'}
          </Typography>
        ) : (
          filteredProducts.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}

export default Home;
