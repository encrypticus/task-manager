import { WithLoggedInProvider } from '@/src/app/providers/with-loggen-in.provider';
import { token } from '@/src/shared/token';
import { WithQueryClientProvider } from '@/src/app/providers/with-query-client.provider';
import { FC, PropsWithChildren } from 'react';

export const WithProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WithLoggedInProvider isLoggedIn={Boolean(token.get())}>
      <WithQueryClientProvider>{children}</WithQueryClientProvider>
    </WithLoggedInProvider>
  );
};
