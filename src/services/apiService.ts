import { config, buildApiUrl, debugLog } from '../config/environment';

// Interface para o produto vindo da API
export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  stock: string; // Vem como string da API
  price: string; // Vem como string da API
  category: string;
  pictureUrl: string;
  created_at: string;
  updated_at: string;
}

// Interface para a resposta da API de produtos
interface ProductsApiResponse {
  success: boolean;
  message: string;
  data: ApiProduct[];
}

// Interface para resposta de login
interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
}

// Interface para criação/edição de produto
export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
  stock: number;
}

// Interface para resposta de operações CRUD
interface CrudResponse {
  success: boolean;
  message: string;
}

// Classe para gerenciar requisições da API
class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem(config.AUTH.TOKEN_KEY);
  }

  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `${token}`;
      }
    }

    return headers;
  }

  private getHeadersWithoutContentType(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {};

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `${token}`;
      }
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `HTTP Error: ${response.status}`;
      debugLog('API Error:', { status: response.status, message: errorMessage });
      throw new Error(errorMessage);
    }

    const data = await response.json();
    debugLog('API Response:', data);
    return data;
  }

  // Login
  async login(email: string, password: string): Promise<LoginResponse> {
    const url = buildApiUrl(config.ENDPOINTS.LOGIN);
    debugLog('Login request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(false), // Não incluir auth no login
      body: JSON.stringify({ email, password }),
    });

    return this.handleResponse<LoginResponse>(response);
  }

  // Buscar produtos
  async fetchProducts(): Promise<ApiProduct[]> {
    const url = buildApiUrl(config.ENDPOINTS.PRODUCTS);
    debugLog('Fetching products from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(true), // Incluir auth token
    });

    const data = await this.handleResponse<ProductsApiResponse>(response);
    
    if (!data.success) {
      throw new Error(data.message || 'Erro ao buscar produtos');
    }

    return data.data;
  }

  // Buscar categorias (baseado nos produtos)
  async fetchCategories(): Promise<string[]> {
    const products = await this.fetchProducts();
    const categories = Array.from(new Set(products.map(product => product.category)));
    return categories;
  }

  // Criar produto
  async createProduct(productData: ProductCreateRequest): Promise<CrudResponse> {
    const url = buildApiUrl(config.ENDPOINTS.PRODUCTS_CREATE);
    debugLog('Creating product:', productData);

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(productData),
    });

    return this.handleResponse<CrudResponse>(response);
  }

  // Atualizar produto
  async updateProduct(id: number, productData: ProductCreateRequest): Promise<CrudResponse> {
    const url = buildApiUrl(`${config.ENDPOINTS.PRODUCTS_UPDATE}/${id}`);
    debugLog('Updating product:', { id, productData });

    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(productData),
    });

    return this.handleResponse<CrudResponse>(response);
  }

  // Deletar produto
  async deleteProduct(id: number): Promise<CrudResponse> {
    const url = buildApiUrl(`${config.ENDPOINTS.PRODUCTS_DELETE}/${id}`);
    debugLog('Deleting product:', { id });

    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeadersWithoutContentType(true), // Headers sem Content-Type
    });

    return this.handleResponse<CrudResponse>(response);
  }
}

// Instância singleton do serviço
export const apiService = new ApiService();
