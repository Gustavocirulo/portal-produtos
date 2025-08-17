
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../contexts/ProductsContext';
import CSVImportModal from '../components/CSVImportModal';


const Home: React.FC = () => {
  const { products, loading, reloadProducts } = useProducts();
  const [code, setCode] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [csvModalOpen, setCsvModalOpen] = useState(false);

  // Função para buscar produto por código
  const handleSearch = async () => {
    if (!code.trim()) {
      setFilteredProducts(products);
      return;
    }
    
    try {
      await reloadProducts();
      const filtered = products.filter((p) => String(p.id) === code.trim());
      setFilteredProducts(filtered);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
    }
  };

  // Função para lidar com mudanças no campo código (apenas números)
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCode(value);
  };

  // useEffect para filtrar produtos automaticamente com debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!code.trim()) {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((p) => String(p.id) === code.trim());
        setFilteredProducts(filtered);
      }
    }, 500); // 500ms de debounce

    return () => clearTimeout(timeoutId);
  }, [code, products]);


  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Portal de Produtos
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setCsvModalOpen(true)}
          >
            Arquivo CSV
          </Button>
          <Button
            component={Link}
            to="/novo-produto"
            variant="contained"
            size="large"
          >
            Novo Produto
          </Button>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
        <TextField
          label="Código"
          variant="outlined"
          size="small"
          value={code}
          onChange={handleCodeChange}
          sx={{ width: 200 }}
          placeholder="Digite o código do produto..."
          inputProps={{
            pattern: '[0-9]*',
            inputMode: 'numeric'
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          size="small"
        >
          Buscar
        </Button>
      </Box>
      {loading ? (
        <Typography variant="h6" sx={{ color: 'text.secondary', mt: 4 }}>
          Carregando produtos...
        </Typography>
      ) : (
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
      )}

      <CSVImportModal
        open={csvModalOpen}
        onClose={() => setCsvModalOpen(false)}
      />
    </Box>
  );
};

export default Home;
