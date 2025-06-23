import axios, { AxiosRequestConfig } from 'axios';

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const instance = axios.create({
    baseURL: '/backend/api',
  });
  
  return instance(config).then(({ data }) => data);
};
