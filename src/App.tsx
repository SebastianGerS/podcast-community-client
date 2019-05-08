import React, { useEffect } from 'react';
import Layout from './Components/Layout/Layout';
import { useSocket } from './Helpers/CustomHooks';
import { Session } from './Models/Session';
import { Follows } from './Actions/User';
import { Notification } from './Models/Notification';
import { Event } from './Models/Event';

interface Props {
  path?: string;
  children: JSX.Element;
  isLogedIn: boolean;
  setHeight: (height: number) => void;
  height: number;
  checkIfResized: () => void;
  getNotifications: (offset: number) => void;
  socket: any;
  createSocket: () => void;
  userId: string | StringConstructor;
  getFollows: () => void;
  addNotification: (notification: Notification) => void;
  getFollowingEvents: (offset: number) => void;
  setEvent: (event: Event) => void;
  updateFollowSessions: (session: Session) => void;
  setFollowSessions: (sessions: Session[]) => void;
  updateFollows: (follows: Follows) => void;
}

function App({
  path, children, isLogedIn, getFollowingEvents, updateFollows, setHeight, height, checkIfResized, setEvent,
  setFollowSessions, updateFollowSessions, getNotifications, socket, createSocket, userId, getFollows, addNotification,
}: Props): JSX.Element {
  useEffect(() => {
    if (!height) {
      setHeight(window.innerHeight);
      checkIfResized();
    }
    if (isLogedIn) {
      getNotifications(0);
      getFollows();
      getFollowingEvents(0);
    }
  }, []);

  useEffect(() => {
    if (height === 0) {
      setHeight(window.innerHeight);
    }
  }, [height]);

  useSocket(socket, `users/${userId}/notification`, addNotification, isLogedIn);
  useSocket(socket, `users/${userId}/follows/online`, setFollowSessions, isLogedIn);
  useSocket(socket, `users/${userId}/follow/online`, updateFollowSessions, isLogedIn);
  useSocket(socket, `users/${userId}/follows`, updateFollows, isLogedIn);
  useSocket(socket, `users/${userId}/event`, setEvent, isLogedIn);

  useEffect(() => {
    if (!socket) {
      createSocket();
    }
    if (isLogedIn) {
      getNotifications(0);
      getFollows();
      getFollowingEvents(0);
      socket.emit('user/online', userId);
    }
  }, [isLogedIn]);

  return (
    <Layout path={path}>
      {children}
    </Layout>
  );
}

export default App;
