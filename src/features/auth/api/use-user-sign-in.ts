import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserSignUpDto } from '@/src/features/auth/model/types/user-sign-up.dto';
import { API } from '@/src/shared/endpoints';
import { UserSignInResponse } from '@/src/features/auth/model/types/user-sign-in-response';
import { notification } from 'antd';
import { useRestInstance } from '@/src/shared/use-rest-instance';

export const useUserSignIn = () => {
  const { restInstance } = useRestInstance();

  return useMutation<UserSignInResponse, AxiosError<string>, UserSignUpDto>({
    mutationFn: async (userSignUpDto) => {
      const res = await restInstance.post(API.signIn, {
        state: 'Internal',
        ...userSignUpDto,
      });
      return res.data;
    },
    onError: (error) => {
      notification.error({
        message: error.response?.data,
      });
    },
  });
};
