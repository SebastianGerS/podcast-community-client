import config from '../Config/config';
import { getToken } from './Auth';

export async function Fetch(path, method, data) {
  const token = getToken();

  const headers = new Headers({
    'Content-type': 'application/json',
  });

  if (token) {
    headers.set('Authorization', `${token}`);
  }

  const body = Object.keys(data).length !== 0 ? data : undefined;

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const response = await new Promise((resolve, reject) => {
    fetch(`${config.API_BASE_URL}${path}`, options)
      .then(res => res.json())
      .then(res => resolve(res)).catch(error => reject(error));
  });

  return response;
}

export const formatError = (err) => {
  let message;
  let subject;

  const index = err.indexOf('$') + 1;

  if (index !== -1) {
    const end = err.indexOf('_');
    subject = err.substring(index, end);

    if (err.includes('dup key')) {
      message = `The ${subject} you entered is already in use`;
    } else {
      message = err;
    }
  } else {
    message = err;
  }


  return message;
};
