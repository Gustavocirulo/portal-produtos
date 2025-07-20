import React from 'react';
import styles from './ProductCard.module.css';
import { Button } from '@mui/material';

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

export default function ProductCard({ product }: ProductCardProps) {
  return (
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
  );
} 