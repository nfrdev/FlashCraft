import { QueryClientConfig } from '@tanstack/react-query';

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute default stale time
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};
