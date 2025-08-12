import { QueryClient } from '@tanstack/react-query';

// Create a query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data stays fresh (5 minutes)
      staleTime: 5 * 60 * 1000,
      // How long data stays in cache (10 minutes)
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 3 times
      retry: 3,
      // Don't refetch on window focus in development
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      // Refetch on network reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

// Error handling for global query errors
queryClient.setMutationDefaults(['availability'], {
  mutationFn: async (_variables: any) => {
    // This will be overridden by specific mutations
    throw new Error('Mutation function not implemented');
  },
  onError: error => {
    console.error('Mutation error:', error);
    // You can add global error handling here (toast notifications, etc.)
  },
});

export default queryClient;
