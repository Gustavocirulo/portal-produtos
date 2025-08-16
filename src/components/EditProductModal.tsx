import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { Product } from '../contexts/ProductsContext';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'>) => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    category: product.category,
    pictureUrl: product.pictureUrl,
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

  const handleSave = () => {
    if (validateForm()) {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        pictureUrl: formData.pictureUrl.trim(),
      };

      onSave(productData);
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form data when closing
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      pictureUrl: product.pictureUrl,
    });
    setErrors({
      name: '',
      description: '',
      price: '',
      category: '',
      pictureUrl: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Produto</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
