import config from '../Config/config';

export default async function fetchFromAPi(path, method, data) {
  const headers = new Headers({
    'Content-type': 'application/json',
  });

  const body = Object.keys(data).length !== 0 ? data : undefined;

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = body;
  }

  const response = await new Promise((resolve, reject) => {
    fetch(`${config.API_BASE_URL}${path}`, options)
      .then(res => res.json())
      .then(res => resolve(res)).catch(error => reject(error));
  });

  return response;
}
