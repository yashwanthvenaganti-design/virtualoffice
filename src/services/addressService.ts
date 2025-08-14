import type {
  AddressesResponse,
  AddressItem,
  AddressQueryParams,
  AddressFormData,
  CountriesResponse,
} from '../types/address';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://172.16.200.15:9090';

class AddressService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  }

  /**
   * Get all addresses for a company
   */
  async getAddresses(params: AddressQueryParams): Promise<AddressesResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('companiesId', params.companiesId);

    // Add other parameters if they exist
    Object.entries(params).forEach(([key, value]) => {
      if (key !== 'companiesId' && value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const response = await this.request<{
      data: AddressItem[];
      message: string;
      status: number;
    }>(`/vo/addresses/viewAddresses?${searchParams.toString()}`);

    // Extract data from the actual API response structure
    return {
      data: response.data || [],
      total: response.data?.length || 0,
    };
  }

  /**
   * Get a single address by ID
   */
  async getAddressById(id: string, companiesId: string): Promise<AddressItem | null> {
    try {
      // Since there's no specific endpoint for single address, get all and filter
      const response = await this.getAddresses({ companiesId });
      const address = response.data.find(addr => addr.addressesId === id);
      return address || null;
    } catch (error) {
      console.error('Error fetching address by ID:', error);
      return null;
    }
  }

  /**
   * Create a new address
   */
  async createAddress(data: AddressFormData, companiesId: string): Promise<AddressItem> {
    const response = await this.request<AddressItem>(
      `/vo/addresses/addAddress?companiesId=${companiesId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    return response;
  }

  /**
   * Update an existing address
   */
  async updateAddress(
    id: string,
    data: AddressFormData,
    companiesId: string
  ): Promise<AddressItem> {
    const response = await this.request<AddressItem>(
      `/vo/addresses/updateAddress?companiesId=${companiesId}&addressesId=${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    return response;
  }

  /**
   * Delete multiple addresses
   */
  async deleteAddresses(
    ids: string[],
    companiesId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.request(`/vo/addresses/deleteAddresses?companiesId=${companiesId}`, {
        method: 'DELETE',
        body: JSON.stringify(ids),
      });

      return {
        success: true,
        message: `Successfully deleted ${ids.length} address(es)`,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all countries (with localStorage caching)
   */
  async getCountries(): Promise<CountriesResponse> {
    const CACHE_KEY = 'app_countries_cache';
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    try {
      // Try to get from localStorage first
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        const isExpired = Date.now() - parsed.timestamp > CACHE_DURATION;

        if (!isExpired && parsed.data) {
          console.log('📦 Using cached countries data');
          return { data: parsed.data };
        }
      }
    } catch (error) {
      console.warn('Failed to read countries from localStorage:', error);
    }

    try {
      // Fetch from API
      console.log('🌐 Fetching countries from API');
      const response = await this.request<any>('/vo/countries/viewCountries');

      const countries = Array.isArray(response) ? response : response.data || [];

      // Cache the result
      try {
        const cacheData = {
          data: countries,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        console.log('💾 Countries cached successfully');
      } catch (error) {
        console.warn('Failed to cache countries to localStorage:', error);
      }

      return { data: countries };
    } catch (error) {
      // Fallback to cached data even if expired, if API fails
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          console.log('⚠️ API failed, using expired cache as fallback');
          return { data: parsed.data || [] };
        }
      } catch (cacheError) {
        console.warn('Failed to read fallback cache:', cacheError);
      }

      throw error;
    }
  }

  /**
   * Clear countries cache (useful for debugging or manual refresh)
   */
  clearCountriesCache(): void {
    try {
      localStorage.removeItem('app_countries_cache');
      console.log('🗑️ Countries cache cleared');
    } catch (error) {
      console.warn('Failed to clear countries cache:', error);
    }
  }
}

export const addressService = new AddressService();
export { AddressService };
