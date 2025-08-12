import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import type {
  AvailabilitiesResponse,
  AvailabilityItem,
  AvailabilityQueryParams,
  AvailabilityFormData,
} from '../types/availability';
import { AvailabilityService } from '../services/availabilityService';

const PEOPLE_ID = import.meta.env.VITE_APP_PEOPLE_ID;

// Query keys for caching and invalidation
export const availabilityKeys = {
  all: ['availabilities'] as const,
  lists: () => [...availabilityKeys.all, 'list'] as const,
  list: (peopleId: string) => [...availabilityKeys.lists(), peopleId] as const,
  details: () => [...availabilityKeys.all, 'detail'] as const,
  detail: (id: string, peopleId: string) => [...availabilityKeys.details(), id, peopleId] as const,
};

/**
 * Hook to fetch all availabilities for a person
 * @param params - Query parameters including peopleId
 * @param options - Additional query options
 */
export function useAvailabilities(
  params: AvailabilityQueryParams,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    onSuccess?: (data: AvailabilitiesResponse) => void;
    onError?: (error: Error) => void;
  }
): UseQueryResult<AvailabilitiesResponse, Error> {
  return useQuery({
    queryKey: availabilityKeys.list(params.peopleId),
    queryFn: () => AvailabilityService.getAvailabilities(params),
    enabled: options?.enabled ?? !!params.peopleId,
    refetchInterval: options?.refetchInterval,
    // Additional options for better UX
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to fetch a single availability by ID
 * @param id - Availability ID
 * @param peopleId - People ID
 * @param options - Additional query options
 */
export function useAvailability(
  id: string,
  peopleId: string,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: AvailabilityItem | null) => void;
    onError?: (error: Error) => void;
  }
): UseQueryResult<AvailabilityItem | null, Error> {
  return useQuery({
    queryKey: availabilityKeys.detail(id, peopleId),
    queryFn: () => AvailabilityService.getAvailabilityById(id, peopleId),
    enabled: options?.enabled ?? (!!id && !!peopleId),
    staleTime: 5 * 60 * 1000, // Individual items stay fresh longer
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to create a new availability
 * @param options - Mutation options
 */
export function useCreateAvailability(options?: {
  onSuccess?: (data: AvailabilityItem) => void;
  onError?: (error: Error) => void;
  onMutate?: (variables: AvailabilityFormData) => void;
}): UseMutationResult<AvailabilityItem, Error, AvailabilityFormData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AvailabilityFormData) =>
      AvailabilityService.createAvailability(data, PEOPLE_ID),
    onMutate: options?.onMutate,
    onSuccess: data => {
      // Invalidate and refetch availabilities list
      queryClient.invalidateQueries({
        queryKey: availabilityKeys.lists(),
      });

      // Set the new item in cache
      queryClient.setQueryData(availabilityKeys.detail(data.availabilitiesId, PEOPLE_ID), data);

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to update an existing availability
 * @param options - Mutation options
 */
export function useUpdateAvailability(options?: {
  onSuccess?: (data: AvailabilityItem) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<AvailabilityItem, Error, { id: string; data: AvailabilityFormData }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => AvailabilityService.updateAvailability(id, data, PEOPLE_ID),
    onSuccess: data => {
      // Update the specific item in cache
      queryClient.setQueryData(availabilityKeys.detail(data.availabilitiesId, PEOPLE_ID), data);

      // Update the item in the list cache
      queryClient.setQueryData(
        availabilityKeys.list(PEOPLE_ID),
        (oldData: AvailabilitiesResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map(item =>
              item.availabilitiesId === data.availabilitiesId ? data : item
            ),
          };
        }
      );

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to delete availabilities (single or multiple)
 * @param options - Mutation options
 */
export function useDeleteAvailabilities(options?: {
  onSuccess?: (data: { success: boolean; message: string }, variables: string[]) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<{ success: boolean; message: string }, Error, string[]> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => AvailabilityService.deleteAvailabilities(ids, PEOPLE_ID),
    onSuccess: (data, ids) => {
      // Remove the items from all relevant caches
      ids.forEach(id => {
        queryClient.removeQueries({
          queryKey: availabilityKeys.detail(id, PEOPLE_ID),
        });
      });

      // Invalidate lists to refetch without the deleted items
      queryClient.invalidateQueries({
        queryKey: availabilityKeys.lists(),
      });

      options?.onSuccess?.(data, ids);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to delete a single availability
 * @param options - Mutation options
 */
export function useDeleteAvailability(options?: {
  onSuccess?: (data: { success: boolean; message: string }, variables: string) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<{ success: boolean; message: string }, Error, string> {
  const deleteMultiple = useDeleteAvailabilities({
    onSuccess: (data, ids) => options?.onSuccess?.(data, ids[0]),
    onError: options?.onError,
  });

  return {
    ...deleteMultiple,
    mutate: (id: string) => deleteMultiple.mutate([id]),
    mutateAsync: (id: string) => deleteMultiple.mutateAsync([id]),
  } as UseMutationResult<{ success: boolean; message: string }, Error, string>;
}

/**
 * Hook to prefetch availabilities (useful for preloading)
 */
export function usePrefetchAvailabilities() {
  const queryClient = useQueryClient();

  return (params: AvailabilityQueryParams) => {
    queryClient.prefetchQuery({
      queryKey: availabilityKeys.list(params.peopleId),
      queryFn: () => AvailabilityService.getAvailabilities(params),
      staleTime: 2 * 60 * 1000,
    });
  };
}
