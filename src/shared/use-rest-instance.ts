import axios from 'axios';
import { token } from './token';

const baseURL = 'http://api.calmplete.net/api';

export const useRestInstance = (auth: boolean = false) => {
  const restInstance = axios.create({
    baseURL,
  });

  restInstance.interceptors.request.use(async (config) => {
    if (auth) {
      config.headers.Authorization = `Bearer ${token.get()}`;
    }

    return { ...config };
  });

  return { restInstance };
};
