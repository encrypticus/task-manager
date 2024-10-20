import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@/src/shared/query-keys';
import { API } from '@/src/shared/endpoints';
import { TaskEntity } from '@/src/shared/types';
import { useRestInstance } from '@/src/shared/use-rest-instance';

export const useFetchTaskList = () => {
  const { restInstance } = useRestInstance(true);

  return useQuery<TaskEntity[], AxiosError>({
    queryKey: queryKeys.tasks.list,
    queryFn: async () => {
      const res = await restInstance.get(API.tasks.list);
      return res.data;
    },
  });
};
