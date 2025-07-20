import React, { useState } from 'react';
import productsData from './mock.json';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

function App() {
  const [code, setCode] = useState('');
  const [products, setProducts] = useState<Product[]>(productsData);

  const handleFilter = () => {
    if (!code) {
      setProducts(productsData);
    } else {
      const filtered = productsData.filter((p) => String(p.id) === code.trim());
      setProducts(filtered);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 6, p: 2 }}>
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
        {products.length === 0 ? (
          <Typography variant="h6" sx={{ color: 'text.secondary', mt: 4 }}>
            Nenhum produto encontrado.
          </Typography>
        ) : (
          products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}

export default App;
