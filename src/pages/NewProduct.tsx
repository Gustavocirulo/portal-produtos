import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { useProducts } from '../contexts/ProductsContext';

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    pictureUrl: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    pictureUrl: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Limpa o erro quando o usuário começa a digitar
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
      price: '',
      category: '',
      pictureUrl: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Preço é obrigatório';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Preço deve ser um número válido maior que zero';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData.pictureUrl.trim()) {
      newErrors.pictureUrl = 'URL da imagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleCreate = () => {
    if (validateForm()) {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        pictureUrl: formData.pictureUrl.trim(),
      };

      addProduct(productData);
      
      // Mostra mensagem de sucesso
      setShowSuccess(true);
      
      // Redireciona após 1.5 segundos
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (showSuccess) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Alert severity="success" sx={{ mb: 4 }}>
          Produto criado com sucesso! Redirecionando...
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Novo Produto
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nome do Produto"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <TextField
            fullWidth
            label="Descrição"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            required
          />

          <TextField
            fullWidth
            label="Preço"
            type="number"
            value={formData.price}
            onChange={handleChange('price')}
            error={!!errors.price}
            helperText={errors.price}
            inputProps={{ 
              min: 0, 
              step: 0.01,
              placeholder: "0.00"
            }}
            required
          />

          <TextField
            fullWidth
            label="Categoria"
            value={formData.category}
            onChange={handleChange('category')}
            error={!!errors.category}
            helperText={errors.category}
            required
          />

          <TextField
            fullWidth
            label="URL da Imagem"
            value={formData.pictureUrl}
            onChange={handleChange('pictureUrl')}
            error={!!errors.pictureUrl}
            helperText={errors.pictureUrl}
            placeholder="https://exemplo.com/imagem.jpg"
            required
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              size="large"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleCreate}
              size="large"
            >
              Criar
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default NewProduct;
