import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { API } from '@/src/shared/endpoints';
import { queryKeys } from '@/src/shared/query-keys';
import { useAuth } from '@/src/app/providers/with-loggen-in.provider';
import { useRestInstance } from '@/src/shared/use-rest-instance';
import { notification } from 'antd';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { isAuthorized } = useAuth();
  const { restInstance } = useRestInstance(true);

  return useMutation<boolean, AxiosError, string>({
    mutationFn: async (id) => {
      if (!isAuthorized?.()) return;

      const res = await restInstance.delete(API.tasks.delete(id));
      return res.data;
    },
    onError: async (error) => {
      notification.error({ message: error.response?.data as string });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list });
    },
  });
};
