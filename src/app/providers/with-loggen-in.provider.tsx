import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { token } from '@/src/shared/token';
import { notification } from 'antd';

type WithLoggedInProviderProps = PropsWithChildren & {
  isLoggedIn?: boolean;
  login?: (isLoggedIn: boolean) => void;
  isAuthorized?: () => void;
};

export const WithLoggedInProvider: FC<WithLoggedInProviderProps> = ({
  children,
  isLoggedIn,
}) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const login = (isLoggedIn: boolean) => setLoggedIn(isLoggedIn);

  const isAuthorized = () => {
    if (!token.get()) {
      login(false);
      notification.error({ message: 'Unauthorized' });
      return false;
    }
    // TODO В этом месте можно добавить проверку актуальности токена
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        login,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext<WithLoggedInProviderProps>(
  {} as WithLoggedInProviderProps,
);

export const useAuth = () => useContext(AuthContext);
