import { createBrowserRouter, LoaderFunction, Outlet } from 'react-router-dom';
import { Layout, RouteErrorBoundary, ProtectedRoute } from './components';
import { Home, About, Categories, Contact, NotFound, Login } from './pages';
import NewProduct from './pages/NewProduct';
import MassImport from './pages/MassImport';
import { apiService, ApiProduct } from './services/apiService';
import { Product } from './contexts/ProductsContext';

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

// Componente wrapper para o Layout protegido com Outlet
const ProtectedLayoutWrapper: React.FC = () => (
  <ProtectedRoute>
    <Layout>
      <Outlet />
    </Layout>
  </ProtectedRoute>
);

// Loader para carregar os produtos
export const productsLoader: LoaderFunction = async () => {
  try {
    const apiProducts = await apiService.fetchProducts();
    const products = apiProducts.map(convertApiProductToProduct);
    return { products };
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return { products: [] };
  }
};

// Loader para categorias
export const categoriesLoader: LoaderFunction = async () => {
  try {
    const categories = await apiService.fetchCategories();
    return { categories };
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    return { categories: [] };
  }
};

// Configuração das rotas com loaders
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/",
    element: <ProtectedLayoutWrapper />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: productsLoader,
      },
      {
        path: "novo-produto",
        element: <NewProduct />,
      },
      {
        path: "importacao-massa",
        element: <MassImport />,
      },
      {
        path: "categories",
        element: <Categories />,
        loader: categoriesLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
