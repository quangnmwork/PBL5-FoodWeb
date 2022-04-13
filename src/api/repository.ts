import axios, { AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
  paramsSerializer: (params: Record<string, string>) =>
    queryString.stringify(params)
});

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default axiosClient;
