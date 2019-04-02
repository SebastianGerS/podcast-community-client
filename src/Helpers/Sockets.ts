// eslint-disable-next-line import/no-unresolved
import io from 'socket.io-client';
import Config from '../Config/config';

export function openSocket(userId: string): any {
  const socket = io.connect(Config.API_BASE_URL);

  socket.on(`user/${userId}`, (data: any) => {
    console.log(data);
  });
  return socket;
}
