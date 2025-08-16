// Configurações do ambiente
export const config = {
  // URL base da API
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081',
  
  // Endpoints da API
  ENDPOINTS: {
    LOGIN: '/login',
    PRODUCTS: '/products',
    PRODUCTS_CREATE: '/products/create',
    PRODUCTS_UPDATE: '/products/update', // será usado como /products/update/{id}
    PRODUCTS_DELETE: '/products/delete', // será usado como /products/delete/{id}
    CATEGORIES: '/categories',
  },
  
  // Configurações de autenticação
  AUTH: {
    TOKEN_KEY: 'access_token',
    REFRESH_TOKEN_KEY: 'refresh_token',
  },
  
  // Configurações de timeout
  TIMEOUTS: {
    REQUEST_TIMEOUT: 10000, // 10 segundos
    DEBOUNCE_DELAY: 500, // 500ms para filtros
  },
  
  // Configurações de ambiente
  ENV: process.env.NODE_ENV || 'development',
  
  // Debug mode
  DEBUG: process.env.REACT_APP_DEBUG === 'true' || false,
};

// Helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};

// Helper para logging em modo debug
export const debugLog = (message: string, data?: any): void => {
  if (config.DEBUG) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
};
