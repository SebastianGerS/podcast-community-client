import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export function useSocket(
  socket: any,
  path: string,
  callback: (emition: any) => void,
  condition: boolean = true,
): void {
  useEffect(() => {
    let removeListener;
    if (socket && condition && !socket.hasListeners(path)) {
      socket.on(path, callback);

      removeListener = () => {
        socket.removeListener(path, callback);
      };
    }
    return removeListener;
  }, [socket, condition]);
}
