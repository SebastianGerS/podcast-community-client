import JWT from 'jsonwebtoken';
import config from '../Config/config';

export const verifytoken = async (token: string): Promise<string | object> => {
  const response = await new Promise(async (resolve, reject) => {
    JWT.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  return response;
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const getToken = (): string | null => localStorage.getItem('token');

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const logedout = (): boolean => {
  removeToken();
  if (!getToken()) {
    return true;
  }
  return false;
};
