import type {
  GreetingsResponse,
  GreetingItem,
  GreetingQueryParams,
  GreetingFormData,
  CreateGreetingResponse,
  UpdateGreetingResponse,
  DeleteGreetingResponse,
} from '../types/greeting';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class GreetingService {
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
   * Get all greetings for a company
   */
  async getGreetings(params: GreetingQueryParams): Promise<GreetingsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append('companiesId', params.companiesId);

    // Add other parameters if they exist
    Object.entries(params).forEach(([key, value]) => {
      if (key !== 'companiesId' && value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const response = await this.request<GreetingsResponse>(
      `/vo/greetings/viewGreetings?${searchParams.toString()}`
    );

    return response;
  }

  /**
   * Get a single greeting by ID
   */
  async getGreetingById(id: string, companiesId: string): Promise<GreetingItem | null> {
    try {
      // Since there's no specific endpoint for single greeting, get all and filter
      const response = await this.getGreetings({ companiesId });
      const greeting = response.data.find(item => item.greetingsId === id);
      return greeting || null;
    } catch (error) {
      console.error('Error fetching greeting by ID:', error);
      return null;
    }
  }

  /**
   * Create a new greeting
   */
  async createGreeting(data: GreetingFormData, companiesId: string): Promise<GreetingItem> {
    const response = await this.request<CreateGreetingResponse>(
      `/vo/greetings/addGreeting?companiesId=${companiesId}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );

    return response.data;
  }

  /**
   * Update an existing greeting
   */
  async updateGreeting(
    id: string,
    data: GreetingFormData,
    companiesId: string
  ): Promise<GreetingItem> {
    const response = await this.request<UpdateGreetingResponse>(
      `/vo/greetings/updateGreeting?companiesId=${companiesId}&greetingsId=${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    return response.data;
  }

  /**
   * Delete multiple greetings
   */
  async deleteGreetings(
    ids: string[],
    companiesId: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.request<DeleteGreetingResponse>(
        `/vo/greetings/deleteGreetings?companiesId=${companiesId}`,
        {
          method: 'POST',
          body: JSON.stringify(ids),
        }
      );

      return {
        success: true,
        message: response.message || `Successfully deleted ${ids.length} greeting(s)`,
      };
    } catch (error) {
      throw error;
    }
  }
}

export const greetingService = new GreetingService();
export { GreetingService };
