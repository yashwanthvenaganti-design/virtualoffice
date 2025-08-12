import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public data?: any;

  constructor(message: string, status: number, statusText: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    // Don't throw errors for 4xx/5xx - we'll handle them ourselves
    validateStatus: () => true,
  });

  // Request interceptor - great for adding auth tokens
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log requests in development
      if (import.meta.env.NODE_ENV === 'development') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }

      return config;
    },
    error => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor - great for handling common errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log responses in development
      if (import.meta.env.NODE_ENV === 'development') {
        console.log(
          `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
          {
            status: response.status,
            data: response.data,
          }
        );
      }

      // Handle non-2xx status codes
      if (response.status >= 400) {
        const errorMessage =
          response.data?.message || response.data?.error || `HTTP Error: ${response.status}`;

        throw new ApiError(errorMessage, response.status, response.statusText, response.data);
      }

      return response;
    },
    (error: AxiosError) => {
      // Handle network errors, timeouts, etc.
      if (error.code === 'ECONNABORTED') {
        throw new ApiError('Request timeout', 408, 'Timeout');
      }

      if (error.code === 'ERR_NETWORK') {
        throw new ApiError('Network error - please check your connection', 0, 'Network Error');
      }

      if (error.response) {
        // Server responded with error status
        let errorMessage: string;
        const data = error.response.data;
        if (data && typeof data === 'object') {
          errorMessage =
            (data as { message?: string; error?: string }).message ||
            (data as { message?: string; error?: string }).error ||
            `HTTP Error: ${error.response.status}`;
        } else {
          errorMessage = `HTTP Error: ${error.response.status}`;
        }

        throw new ApiError(
          errorMessage,
          error.response.status,
          error.response.statusText,
          error.response.data
        );
      }

      // Something else happened
      throw new ApiError(error.message || 'Unknown error occurred', 0, 'Unknown Error');
    }
  );

  return instance;
};

// API client class
export class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = createAxiosInstance();
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(endpoint, { params });
    return response.data;
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(endpoint, data);
    return response.data;
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(endpoint, data);
    return response.data;
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(endpoint, data);
    return response.data;
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(endpoint);
    return response.data;
  }

  // Upload files (multipart/form-data)
  async upload<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Cancel all pending requests (useful for cleanup)
  cancelAllRequests() {
    // Axios automatically cancels requests when component unmounts
    // if you use the signal from useQuery properly
  }

  // Get the underlying axios instance for advanced usage
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

// Create and export a default API client instance
export const apiClient = new ApiClient();

// Export axios instance for direct use if needed
export const axiosInstance = apiClient.getAxiosInstance();
