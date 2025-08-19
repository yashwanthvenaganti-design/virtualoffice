import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';
import type {
  GreetingsResponse,
  GreetingItem,
  GreetingQueryParams,
  GreetingFormData,
} from '../types/greeting';
import { greetingService } from '../services/greetingService';

const COMPANIES_ID = import.meta.env.VITE_APP_COMPANIES_ID;

// Query keys for caching and invalidation
export const greetingKeys = {
  all: ['greetings'] as const,
  lists: () => [...greetingKeys.all, 'list'] as const,
  list: (companiesId: string) => [...greetingKeys.lists(), companiesId] as const,
  details: () => [...greetingKeys.all, 'detail'] as const,
  detail: (id: string, companiesId: string) =>
    [...greetingKeys.details(), id, companiesId] as const,
};

/**
 * Hook to fetch all greetings for a company
 */
export function useGreetings(
  params: GreetingQueryParams,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
    onSuccess?: (data: GreetingsResponse) => void;
    onError?: (error: Error) => void;
  }
): UseQueryResult<GreetingsResponse, Error> {
  return useQuery({
    queryKey: greetingKeys.list(params.companiesId),
    queryFn: () => greetingService.getGreetings(params),
    enabled: options?.enabled ?? !!params.companiesId,
    refetchInterval: options?.refetchInterval,
    staleTime: 2 * 60 * 1000, // Data is fresh for 2 minutes
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to fetch a single greeting by ID
 */
export function useGreeting(
  id: string,
  companiesId: string,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: GreetingItem | null) => void;
    onError?: (error: Error) => void;
  }
): UseQueryResult<GreetingItem | null, Error> {
  return useQuery({
    queryKey: greetingKeys.detail(id, companiesId),
    queryFn: () => greetingService.getGreetingById(id, companiesId),
    enabled: options?.enabled ?? (!!id && !!companiesId),
    staleTime: 5 * 60 * 1000,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

/**
 * Hook to create a new greeting
 */
export function useCreateGreeting(options?: {
  onSuccess?: (data: GreetingItem) => void;
  onError?: (error: Error) => void;
  onMutate?: (variables: GreetingFormData) => void;
}): UseMutationResult<GreetingItem, Error, GreetingFormData> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GreetingFormData) => greetingService.createGreeting(data, COMPANIES_ID),
    onMutate: options?.onMutate,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: greetingKeys.lists(),
      });

      queryClient.setQueryData(greetingKeys.detail(data.greetingsId, COMPANIES_ID), data);

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to update an existing greeting
 */
export function useUpdateGreeting(options?: {
  onSuccess?: (data: GreetingItem) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<GreetingItem, Error, { id: string; data: GreetingFormData }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => greetingService.updateGreeting(id, data, COMPANIES_ID),
    onSuccess: data => {
      queryClient.setQueryData(greetingKeys.detail(data.greetingsId, COMPANIES_ID), data);

      queryClient.setQueryData(
        greetingKeys.list(COMPANIES_ID),
        (oldData: GreetingsResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map(item => (item.greetingsId === data.greetingsId ? data : item)),
          };
        }
      );

      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to delete greetings (single or multiple)
 */
export function useDeleteGreetings(options?: {
  onSuccess?: (data: { success: boolean; message: string }, variables: string[]) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<{ success: boolean; message: string }, Error, string[]> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => greetingService.deleteGreetings(ids, COMPANIES_ID),
    onSuccess: (data, ids) => {
      ids.forEach(id => {
        queryClient.removeQueries({
          queryKey: greetingKeys.detail(id, COMPANIES_ID),
        });
      });

      queryClient.invalidateQueries({
        queryKey: greetingKeys.lists(),
      });

      options?.onSuccess?.(data, ids);
    },
    onError: options?.onError,
  });
}

/**
 * Hook to delete a single greeting
 */
export function useDeleteGreeting(options?: {
  onSuccess?: (data: { success: boolean; message: string }, variables: string) => void;
  onError?: (error: Error) => void;
}): UseMutationResult<{ success: boolean; message: string }, Error, string> {
  const deleteMultiple = useDeleteGreetings({
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
 * Hook to prefetch greetings
 */
export function usePrefetchGreetings() {
  const queryClient = useQueryClient();

  return (params: GreetingQueryParams) => {
    queryClient.prefetchQuery({
      queryKey: greetingKeys.list(params.companiesId),
      queryFn: () => greetingService.getGreetings(params),
      staleTime: 2 * 60 * 1000,
    });
  };
}
