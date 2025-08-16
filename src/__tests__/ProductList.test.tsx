import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProductsProvider } from '../contexts/ProductsContext';
import { AuthProvider } from '../contexts/AuthContext';
import Home from '../pages/Home';
import { SnackbarProvider } from '../contexts/SnackbarContext';

// Mock de produtos para o contexto
const mockProducts = [
  { id: 1, name: 'Produto A', category: 'Categoria 1', stock: 10, price: 100, image: '', description: '' },
  { id: 2, name: 'Produto B', category: 'Categoria 2', stock: 5, price: 200, image: '', description: '' },
  { id: 3, name: 'Produto C', category: 'Categoria 1', stock: 0, price: 300, image: '', description: '' },
];

jest.mock('../contexts/ProductsContext', () => {
  const actual = jest.requireActual('../contexts/ProductsContext');
  return {
    ...actual,
    useProducts: () => ({
      products: mockProducts,
      loading: false,
      reloadProducts: jest.fn(),
    }),
  };
});

describe('Página de listagem de produtos', () => {
  it('exibe todos os produtos vindos do loader/contexto', () => {
    render(
      <SnackbarProvider>
        <AuthProvider>
          <ProductsProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </MemoryRouter>
          </ProductsProvider>
        </AuthProvider>
      </SnackbarProvider>
    );
  expect(screen.getByText(/\(1\) Produto A/)).toBeInTheDocument();
  expect(screen.getByText(/\(2\) Produto B/)).toBeInTheDocument();
  expect(screen.getByText(/\(3\) Produto C/)).toBeInTheDocument();
  });

  it('filtra produtos corretamente pelo campo de busca', async () => {
    render(
      <SnackbarProvider>
        <AuthProvider>
          <ProductsProvider>
            <MemoryRouter initialEntries={["/"]}>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </MemoryRouter>
          </ProductsProvider>
        </AuthProvider>
      </SnackbarProvider>
    );
    const input = screen.getByPlaceholderText(/código/i);
    fireEvent.change(input, { target: { value: '2' } });
    await waitFor(() => {
  expect(screen.getByText(/\(2\) Produto B/)).toBeInTheDocument();
  expect(screen.queryByText(/\(1\) Produto A/)).not.toBeInTheDocument();
  expect(screen.queryByText(/\(3\) Produto C/)).not.toBeInTheDocument();
    });
  });
});
