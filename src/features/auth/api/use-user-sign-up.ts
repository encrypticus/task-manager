import { useMutation } from '@tanstack/react-query';
import { UserSignUpResponse } from '@/src/features/auth/model/types/user-sign-up-response';
import { AxiosError } from 'axios';
import { UserSignUpDto } from '@/src/features/auth/model/types/user-sign-up.dto';
import { API } from '@/src/shared/endpoints';
import { notification } from 'antd';
import { useRestInstance } from '@/src/shared/use-rest-instance';

export const useUserSignUp = () => {
  const { restInstance } = useRestInstance();

  return useMutation<UserSignUpResponse, AxiosError<string>, UserSignUpDto>({
    mutationFn: async (userSignUpDto) => {
      const res = await restInstance.post(API.signUp, userSignUpDto);
      return res.data;
    },
    onSuccess: () => {
      notification.success({
        message: 'You have successfully registered!',
        description: 'Please sign in',
      });
    },
    onError: (error) => {
      notification.error({
        message: error.response?.data,
      });
    },
  });
};
