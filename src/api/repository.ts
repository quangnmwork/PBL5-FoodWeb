import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN,
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
  paramsSerializer: (params: Record<string, string>) =>
    queryString.stringify(params)
});

export default axiosClient;
