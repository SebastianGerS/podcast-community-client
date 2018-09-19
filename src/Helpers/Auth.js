import JWT from 'jsonwebtoken';
import config from '../Config/config';

export const verifytoken = async (token) => {
  const response = await new Promise(async (resolve, reject) => {
    JWT.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  return response;
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const logedout = () => {
  removeToken();
  if (!getToken()) {
    return true;
  }
  return false;
};
