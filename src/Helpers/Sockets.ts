import io from 'socket.io-client';
import Config from '../Config/config';

export function openSocket(): any {
  return io.connect(Config.API_BASE_URL);
}
