import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import type {
  AddressesResponse,
  AddressItem,
  AddressQueryParams,
  AddressFormData,
  CountriesResponse,
} from '../types/address';
import { addressService } from '../services/addressService';

const COMPANIES_ID = import.meta.env.VITE_APP_COMPANIES_ID;

// Query keys for caching and invalidation
export const addressKeys = {
  all: ['addresses'] as const,
  lists: () => [...addressKeys.all, 'list'] as const,
  list: (companiesId: string) => [...addressKeys.lists(), companiesId] as const,
  details: () => [...addressKeys.all, 'detail'] as const,
  detail: (id: string, companiesId: string) => [...addressKeys.details(), id, companiesId] as const,
  countries: ['countries'] as const,
};

/**
 * Hook to fetch all addresses for a company
 * @param params - Query parameters including companiesId
 * @param options - Additional query options
 */
export function useAddresses(
  params: AddressQueryParams,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    onSuccess?: (data: AddressesResponse) => void;
    onError?: (error: Error) => void;
  }
): UseQueryResult<AddressesResponse, Error> {
  return useQuery({
    queryKey: addressKeys.list(params.companiesId),
    queryFn: () => addressService.getAddresses(params),
    enabled: options?.enabled ?? !!params.companiesId,
    refetchInterval: options?.refetchInterval,
    // Additional options for better UX
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to fetch a single address by ID
 * @param id - Address ID
 * @param companiesId - Companies ID
 * @param options - Additional query options
 */
export function useAddress(
  id: string,
  companiesId: string,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: AddressItem | null) => void;
    onError?: (error: Error) => void;
  }
): UseQueryResult<AddressItem | null, Error> {
  return useQuery({
    queryKey: addressKeys.detail(id, companiesId),
    queryFn: () => addressService.getAddressById(id, companiesId),
    enabled: options?.enabled ?? (!!id && !!companiesId),
    staleTime: 5 * 60 * 1000, // Individual items stay fresh longer
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to create a new address
 * @param options - Mutation options
 */
export function useCreateAddress(options?: {
  onSuccess?: (data: AddressItem) => void;
  onError?: (error: Error) => void;
  onMutate?: (variables: AddressFormData) => void;
}): UseMutationResult<AddressItem, Error, AddressFormData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddressFormData) => addressService.createAddress(data, COMPANIES_ID),
    onMutate: options?.onMutate,
    onSuccess: data => {
      // Invalidate and refetch addresses list
      queryClient.invalidateQueries({
        queryKey: addressKeys.lists(),
      });

      // Set the new item in cache
      queryClient.setQueryData(addressKeys.detail(data.addressesId, COMPANIES_ID), data);

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to update an existing address
 * @param options - Mutation options
 */
export function useUpdateAddress(options?: {
  onSuccess?: (data: AddressItem) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<AddressItem, Error, { id: string; data: AddressFormData }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => addressService.updateAddress(id, data, COMPANIES_ID),
    onSuccess: data => {
      // Update the specific item in cache
      queryClient.setQueryData(addressKeys.detail(data.addressesId, COMPANIES_ID), data);

      // Update the item in the list cache
      queryClient.setQueryData(
        addressKeys.list(COMPANIES_ID),
        (oldData: AddressesResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map(item => (item.addressesId === data.addressesId ? data : item)),
          };
        }
      );

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to delete addresses (single or multiple)
 * @param options - Mutation options
 */
export function useDeleteAddresses(options?: {
  onSuccess?: (data: { success: boolean; message: string }, variables: string[]) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<{ success: boolean; message: string }, Error, string[]> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => addressService.deleteAddresses(ids, COMPANIES_ID),
    onSuccess: (data, ids) => {
      // Remove the items from all relevant caches
      ids.forEach(id => {
        queryClient.removeQueries({
          queryKey: addressKeys.detail(id, COMPANIES_ID),
        });
      });

      // Invalidate lists to refetch without the deleted items
      queryClient.invalidateQueries({
        queryKey: addressKeys.lists(),
      });

      options?.onSuccess?.(data, ids);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to delete a single address
 * @param options - Mutation options
 */
export function useDeleteAddress(options?: {
  onSuccess?: (data: { success: boolean; message: string }, variables: string) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<{ success: boolean; message: string }, Error, string> {
  const deleteMultiple = useDeleteAddresses({
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
 * Hook to fetch countries with localStorage caching
 * @param options - Additional query options
 */
export function useCountries(options?: {
  enabled?: boolean;
  onSuccess?: (data: CountriesResponse) => void;
  onError?: (error: Error) => void;
}): UseQueryResult<CountriesResponse, Error> {
  return useQuery({
    queryKey: addressKeys.countries,
    queryFn: () => addressService.getCountries(),
    enabled: options?.enabled ?? true,
    staleTime: 24 * 60 * 60 * 1000, // Countries are cached for 24 hours, so mark as fresh
    gcTime: 48 * 60 * 60 * 1000, // Keep in React Query cache for 48 hours
    retry: 2, // Retry failed requests
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to prefetch addresses (useful for preloading)
 */
export function usePrefetchAddresses() {
  const queryClient = useQueryClient();

  return (params: AddressQueryParams) => {
    queryClient.prefetchQuery({
      queryKey: addressKeys.list(params.companiesId),
      queryFn: () => addressService.getAddresses(params),
      staleTime: 2 * 60 * 1000,
    });
  };
}
