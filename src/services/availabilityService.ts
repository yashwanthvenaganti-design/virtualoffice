import { apiClient, type ApiResponse } from '../lib/api';
import {
  type AvailabilitiesResponse,
  type AvailabilityQueryParams,
  type AvailabilityFormData,
  type AvailabilityItem,
  AVAILABILITY_ENDPOINTS,
} from '../types/availability';

// Service class for availability-related API calls
export class AvailabilityService {
  /**
   * Fetch all availabilities for a specific person
   * @param params - Query parameters including peopleId
   * @returns Promise with availabilities data
   */
  static async getAvailabilities(params: AvailabilityQueryParams): Promise<AvailabilitiesResponse> {
    const response = await apiClient.get<AvailabilityItem[]>(AVAILABILITY_ENDPOINTS.LIST, {
      peopleId: params.peopleId,
    });

    // The API returns the data directly in the expected format
    return {
      data: response.data,
      message: response.message,
      status: response.status,
    };
  }

  /**
   * Get a single availability item by ID
   * @param id - Availability ID
   * @param peopleId - People ID for context
   * @returns Promise with single availability item
   */
  static async getAvailabilityById(id: string, peopleId: string): Promise<AvailabilityItem | null> {
    // Since the API doesn't have a single item endpoint, we fetch all and filter
    const response = await this.getAvailabilities({ peopleId });
    return response.data.find(item => item.availabilitiesId === id) || null;
  }

  /**
   * Create a new availability
   * @param data - Availability form data
   * @param peopleId - People ID
   * @returns Promise with created availability
   */
  static async createAvailability(
    data: AvailabilityFormData,
    peopleId: string
  ): Promise<AvailabilityItem> {
    const response = await apiClient.post<AvailabilityItem>(
      `${AVAILABILITY_ENDPOINTS.CREATE}?peopleId=${peopleId}`,
      data
    );
    return response.data;
  }

  /**
   * Update an existing availability
   * @param id - Availability ID
   * @param data - Updated availability data
   * @param peopleId - People ID
   * @returns Promise with updated availability
   */
  static async updateAvailability(
    id: string,
    data: AvailabilityFormData,
    peopleId: string
  ): Promise<AvailabilityItem> {
    const response = await apiClient.put<AvailabilityItem>(
      `${AVAILABILITY_ENDPOINTS.UPDATE}?peopleId=${peopleId}&availabilityId=${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete multiple availabilities
   * @param ids - Array of availability IDs to delete
   * @param peopleId - People ID
   * @returns Promise with deletion confirmation
   */
  static async deleteAvailabilities(
    ids: string[],
    peopleId: string
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      `${AVAILABILITY_ENDPOINTS.DELETE}?peopleId=${peopleId}`,
      ids
    );
    return response.data;
  }

  /**
   * Delete a single availability
   * @param id - Availability ID
   * @param peopleId - People ID
   * @returns Promise with deletion confirmation
   */
  static async deleteAvailability(
    id: string,
    peopleId: string
  ): Promise<{ success: boolean; message: string }> {
    return this.deleteAvailabilities([id], peopleId);
  }
}

// Export individual functions for easier imports
export const {
  getAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
  deleteAvailabilities,
} = AvailabilityService;
