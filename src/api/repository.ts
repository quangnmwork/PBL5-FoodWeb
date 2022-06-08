import axios, { AxiosError, AxiosResponse } from 'axios';
import queryString from 'query-string';
const url =
  process.env.NODE_ENV == 'development'
    ? process.env.REACT_APP_DOMAIN
    : process.env.REACT_APP_DOMAIN_PROD;
const axiosClient = axios.create({
  baseURL: url,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
  paramsSerializer: (params: Record<string, string>) =>
    queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  let accessToken = '';
  if (process.env.REACT_APP_NAME_TOKEN) {
    accessToken = localStorage.getItem(process.env.REACT_APP_NAME_TOKEN) || '';
  }
  // console.log(process.env.REACT_APP_NAME_TOKEN);
  return {
    ...config,
    headers: {
      Authorization: accessToken
    }
  };
});

axiosClient.interceptors.response.use(
  async (res: AxiosResponse) => {
    return res;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default axiosClient;
