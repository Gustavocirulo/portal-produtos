import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../mock.json';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, productData: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
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

  // Simula carregamento dos dados (loader)
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simula delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(productsData);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1, // Gera novo ID
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProduct = (id: number, productData: Omit<Product, 'id'>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...productData, id } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  const value: ProductsContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    loading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
