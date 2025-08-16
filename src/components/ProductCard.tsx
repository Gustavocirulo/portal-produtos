import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { Button } from '@mui/material';
import { useProducts } from '../contexts/ProductsContext';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { updateProduct, deleteProduct } = useProducts();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = (productData: Omit<Product, 'id'>) => {
    updateProduct(product.id, productData);
  };

  const handleConfirmDelete = () => {
    deleteProduct(product.id);
  };

  return (
    <>
      <div className={styles.card}>
      <div className={styles.imageArea}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.contentArea}>
        <div className={styles.title}>
          ({product.id}) {product.name}
        </div>
        <div className={styles.category}>{product.category}</div>
        <div className={styles.price}>{formatPrice(product.price)}</div>
        <div className={styles.buttonArea}>
          <Button
            variant="contained"
            className={styles.editButton}
            onClick={handleEdit}
            disableElevation
            sx={{
              minWidth: 'unset',
              padding: 0,
              margin: 0,
              '&.MuiButton-root': {
                minWidth: 'unset',
                padding: 0,
                margin: 0,
              }
            }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            className={styles.deleteButton}
            onClick={handleDelete}
            disableElevation
            sx={{
              minWidth: 'unset',
              padding: 0,
              margin: 0,
              '&.MuiButton-root': {
                minWidth: 'unset',
                padding: 0,
                margin: 0,
              }
            }}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>

    {/* Modais */}
    <EditProductModal
      open={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      onSave={handleSaveEdit}
      product={product}
    />

    <DeleteConfirmationModal
      open={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      onConfirm={handleConfirmDelete}
      productName={product.name}
    />
  </>
  );
};

export default ProductCard; 