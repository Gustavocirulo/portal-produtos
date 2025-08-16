import { config, buildApiUrl, debugLog } from '../config/environment';
import axios from 'axios';

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

  private getHeaders(includeAuth: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {
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

  private getHeadersWithoutContentType(includeAuth: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {};
    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `${token}`;
      }
    }
    return headers;
  }

  private handleAxiosError(error: any) {
    if (error.response) {
      debugLog('API Error:', error.response.data);
      throw new Error(error.response.data?.message || 'Erro na requisição');
    }
  throw error;
  }

  // Login
  async login(email: string, password: string): Promise<LoginResponse> {
    const url = buildApiUrl(config.ENDPOINTS.LOGIN);
    debugLog('Login request to:', url);
    try {
      const { data } = await axios.post<LoginResponse>(url, { email, password }, {
        headers: this.getHeaders(false),
      });
      debugLog('API Response:', data);
      return data;
    } catch (error) {
      this.handleAxiosError(error);
      return undefined as any;
    }
  }

  // Buscar produtos
  async fetchProducts(): Promise<ApiProduct[]> {
    const url = buildApiUrl(config.ENDPOINTS.PRODUCTS);
    debugLog('Fetching products from:', url);
    try {
      const { data } = await axios.get<ProductsApiResponse>(url, {
        headers: this.getHeaders(true),
      });
      debugLog('API Response:', data);
      if (!data.success) {
        throw new Error(data.message || 'Erro ao buscar produtos');
      }
      return data.data;
    } catch (error) {
      this.handleAxiosError(error);
      return undefined as any;
    }
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
    try {
      const { data } = await axios.post<CrudResponse>(url, productData, {
        headers: this.getHeaders(true),
      });
      debugLog('API Response:', data);
      return data;
    } catch (error) {
      this.handleAxiosError(error);
    throw new Error('Erro ao criar produto');
    }
  }

  // Atualizar produto
  async updateProduct(id: number, productData: ProductCreateRequest): Promise<CrudResponse> {
    const url = buildApiUrl(`${config.ENDPOINTS.PRODUCTS_UPDATE}/${id}`);
    debugLog('Updating product:', { id, productData });
    try {
      const { data } = await axios.put<CrudResponse>(url, productData, {
        headers: this.getHeaders(true),
      });
      debugLog('API Response:', data);
      return data;
    } catch (error) {
      this.handleAxiosError(error);
    throw new Error('Erro ao atualizar produto');
    }
  }

  // Deletar produto
  async deleteProduct(id: number): Promise<CrudResponse> {
    const url = buildApiUrl(`${config.ENDPOINTS.PRODUCTS_DELETE}/${id}`);
    debugLog('Deleting product:', { id });
    try {
      const { data } = await axios.delete<CrudResponse>(url, {
        headers: this.getHeadersWithoutContentType(true),
      });
      debugLog('API Response:', data);
      return data;
    } catch (error) {
      this.handleAxiosError(error);
    throw new Error('Erro ao deletar produto');
    }
  }
}

// Instância singleton do serviço
export const apiService = new ApiService();
