import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useProducts } from '../contexts/ProductsContext';
import EditProductModal from './EditProductModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { config } from '../config/environment';
import UploadImageModal from './UploadImageModal';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
  stock: number;
}

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { updateProduct, deleteProduct, reloadProducts } = useProducts();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async (productData: Omit<Product, 'id'>) => {
    await updateProduct(product.id, productData);
  };

  const handleConfirmDelete = () => {
    deleteProduct(product.id);
  };

  // URL da imagem baseada no código do produto, com cache bust
  const imageUrl = `${config.API_BASE_URL}/products/image/${product.id}?t=${Date.now()}`;

  return (
    <>
      <div className={styles.card}>
        <div
          className={styles.imageArea}
          onMouseEnter={() => setImageHover(true)}
          onMouseLeave={() => setImageHover(false)}
          style={{ position: 'relative' }}
        >
          <img
            src={imageUrl}
            alt={product.name}
            className={styles.productImage + (imageHover ? ' ' + styles.imageDimmed : '')}
          />
          {imageHover && (
            <IconButton
              className={styles.editImageButton}
              onClick={() => setImageModalOpen(true)}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(255,255,255,0.7)',
                zIndex: 2,
              }}
            >
              <EditIcon fontSize="large" />
            </IconButton>
          )}
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

      {/* Modal de upload de imagem */}
      <UploadImageModal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        productId={product.id}
        onSuccess={async () => {
          setImageModalOpen(false);
          await reloadProducts();
        }}
      />
    </>
  );
};

export default ProductCard;