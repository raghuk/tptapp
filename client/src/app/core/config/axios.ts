import axios from 'axios';

import { APP_CONFIG } from './api';


declare module 'axios' {
  interface AxiosRequestConfig {
    pathParams?: Record<string, string>;
  }
}

export const axiosAPI = axios.create({
  baseURL: APP_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json'
  }
});


// Add a request interceptor
axiosAPI.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['authorization'] = `Bearer ${accessToken}`;
  }

  const currentUrl = new URL(config.url, config.baseURL);

  // parse pathName to convert string literals with values provided
  Object.entries(config.pathParams || {}).forEach(([k, v]) => {
    currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
  });

  return { ...config, url: currentUrl.pathname };
}, (error) => {
  return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});
