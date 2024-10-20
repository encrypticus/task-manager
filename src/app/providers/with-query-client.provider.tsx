import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const WithQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              refetchIntervalInBackground: false,
            },
          },
        })
      }
    >
      {children}
    </QueryClientProvider>
  );
};