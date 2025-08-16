import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService, ApiProduct, ProductCreateRequest } from '../services/apiService';
import { useAuth } from './AuthContext';
import { useSnackbar } from './SnackbarContext';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
  stock: number;
}

// Função para converter ApiProduct em Product
const convertApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  name: apiProduct.name,
  description: apiProduct.description,
  price: parseFloat(apiProduct.price),
  category: apiProduct.category,
  pictureUrl: apiProduct.pictureUrl,
  stock: parseFloat(apiProduct.stock)
});

// Função para converter ProductInput em ProductCreateRequest
const convertProductToCreateRequest = (product: ProductInput): ProductCreateRequest => ({
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category,
  pictureUrl: product.pictureUrl,
  stock: 0, // Valor padrão, pois não temos stock no frontend ainda
});

interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
  stock: number;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: ProductInput) => void;
  updateProduct: (id: number, productData: ProductInput) => void;
  deleteProduct: (id: number) => void;
  reloadProducts: () => Promise<void>;
  loading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de um ProductsProvider');
  }
  return context;
};

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { showMessage } = useSnackbar();

  // Função para recarregar produtos da API
  const reloadProducts = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const apiProducts = await apiService.fetchProducts();
      const products = apiProducts.map(convertApiProductToProduct).sort((a, b) => a.id - b.id);
      setProducts(products);
    } catch (error) {
      console.error('Erro ao recarregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os produtos da API
  useEffect(() => {
    const loadProducts = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiProducts = await apiService.fetchProducts();
  const products = apiProducts.map(convertApiProductToProduct).sort((a, b) => a.id - b.id);
  setProducts(products);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [token]);

  // CRUD reabilitado - integrado com API
  const addProduct = async (productData: ProductInput) => {
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      setLoading(true);
      const createRequest = convertProductToCreateRequest(productData);
      const response = await apiService.createProduct(createRequest);
      
      if (response.success) {
        await reloadProducts();
        showMessage(response.message || 'Produto criado com sucesso!', 'success');
      } else {
        showMessage(response.message || 'Erro ao criar produto.', 'error');
      }
    } catch (error: any) {
      showMessage(error?.message || 'Erro ao criar produto.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, productData: ProductInput) => {
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      setLoading(true);
      const updateRequest = convertProductToCreateRequest(productData);
      const response = await apiService.updateProduct(id, updateRequest);
      
      if (response.success) {
        await reloadProducts();
        showMessage(response.message || 'Produto atualizado com sucesso!', 'success');
      } else {
        showMessage(response.message || 'Erro ao atualizar produto.', 'error');
      }
    } catch (error: any) {
      showMessage(error?.message || 'Erro ao atualizar produto.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!token) {
      console.error('Token de autenticação não encontrado');
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.deleteProduct(id);
      
      if (response.success) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        showMessage(response.message || 'Produto deletado com sucesso!', 'success');
      } else {
        showMessage(response.message || 'Erro ao deletar produto.', 'error');
      }
    } catch (error: any) {
      showMessage(error?.message || 'Erro ao deletar produto.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const value: ProductsContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    reloadProducts,
    loading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
