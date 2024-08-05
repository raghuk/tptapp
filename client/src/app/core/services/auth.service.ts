import { jwtDecode } from 'jwt-decode';
import { AxiosResponse } from 'axios';

import { axiosAPI } from '../config/axios';
import { AUTH_URL } from '../config/api';


const isTokenExpired = (token: string) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');

  // no token found return 'false'
  if (!token) {
    return false;
  }

  // check whether the token is expired and return 'true' or 'false'
  return !isTokenExpired(token);
};

export const login = async (credentials: { username: string, password: string }): Promise<AxiosResponse<any>> => {

  const response = await axiosAPI.post(AUTH_URL.LOGIN, credentials);
  const data = response.data;

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('accessToken', data.user.accessToken);

  return response;
};

export const roles = (): Promise<AxiosResponse<any>> => {
  return axiosAPI.get(AUTH_URL.ROLES);
};

export const logout = (): void => {
  // remove user from local storage and set current user to null
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
};
