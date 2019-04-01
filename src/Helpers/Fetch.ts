import config from '../Config/config';
import { getToken } from './Auth';
import { User } from '../Models/User';
import { Podcast } from '../Models/Podcast';
import { Category } from '../Models/Category';
import { Episode } from '../Models/Episode';
import { Genre } from '../Models/Genre';

export interface Response {
  message: string;
  error: {
    errmsg: string;
  };
  info: string;
  results: (User | Podcast | Episode | Notification)[];
  user: User;
  subscriptions: Podcast[];
  categories: Category[];
  genres: Genre[];
  languages: string[];
  followers: User[];
  following: User[];
  requests: User[];
}

export async function Fetch(path: string, method: string, data: object | string): Promise<Response> {
  const token = getToken();

  const headers = new Headers({
    'Content-type': 'application/json',
  });

  if (token) {
    headers.set('Authorization', `${token}`);
  }

  const body = Object.keys(data).length !== 0 ? data : undefined;

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const response: Response = await new Promise((resolve, reject) => {
    fetch(`${config.API_BASE_URL}${path}`, options)
      .then(res => res.json())
      .then(res => resolve(res)).catch(error => reject(error));
  });

  return response;
}

export const formatError = (err: string): string => {
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
