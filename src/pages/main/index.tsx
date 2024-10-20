import { FC } from 'react';
import { AuthForm } from '@/src/features/auth';
import { useAuth } from '@/src/app/providers/with-loggen-in.provider';
import { TaskList } from '../../entities/tasks';

export const MainPage: FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <TaskList /> : <AuthForm />;
};
