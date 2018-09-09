import config from '../Config/config';

export default async function fetchFromAPi(path, method, body) {
  const headers = new Headers({
    'Content-type': 'application/json',
  });

  const response = await new Promise((resolve, reject) => {
    fetch(`${config.API_BASE_URL}${path}`, { method, headers, body })
      .then(data => data.json())
      .then(data => resolve(data)).catch(error => reject(error));
  });

  return response;
}
