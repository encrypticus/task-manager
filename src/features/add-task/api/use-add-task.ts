import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AddTaskDto } from '@/src/features/add-task/model/types/add-task.dto';
import { API } from '@/src/shared/endpoints';
import { queryKeys } from '@/src/shared/query-keys';
import { useAuth } from '@/src/app/providers/with-loggen-in.provider';
import { useRestInstance } from '@/src/shared/use-rest-instance';
import { notification } from 'antd';

export const useAddTask = () => {
  const queryClient = useQueryClient();
  const { isAuthorized } = useAuth();
  const { restInstance } = useRestInstance(true);

  return useMutation<boolean, AxiosError, AddTaskDto>({
    mutationFn: async (addTaskDto) => {
      if (!isAuthorized?.()) return;

      try {
        const res = await restInstance.post(API.tasks.add, { ...addTaskDto });
        return res.data;
      } catch (error) {
        notification.error({
          message: (error as AxiosError).message,
        });
      }
    },
    onSuccess: (data) => {
      if (data !== undefined)
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list });
    },
  });
};
