import { createBrowserRouter, LoaderFunction, Outlet } from 'react-router-dom';
import { Layout, RouteErrorBoundary } from './components';
import { Home, About, Categories, Contact, NotFound } from './pages';
import NewProduct from './pages/NewProduct';
import productsData from './mock.json';
import { Product } from './contexts/ProductsContext';

// Componente wrapper para o Layout com Outlet
const LayoutWrapper: React.FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Loader para carregar os produtos
export const productsLoader: LoaderFunction = async () => {
  // Simula delay de carregamento (como uma API call)
  await new Promise(resolve => setTimeout(resolve, 500));
  return { products: productsData as Product[] };
};

// Loader para categorias
export const categoriesLoader: LoaderFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const products = productsData as Product[];
  const categories = Array.from(new Set(products.map(product => product.category)));
  return { categories };
};

// Configuração das rotas com loaders
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
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
