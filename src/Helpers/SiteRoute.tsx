import React, { useEffect, ComponentProps } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Header from '../Containers/Layout/Header';
import SearchBar from '../Containers/Search/SearchBar';
import PlaybackInterface from '../Containers/Playback/PlaybackInterface';
import Footer from '../Components/Layout/Footer';
import MenuInterFace from '../Containers/Layout/MenuInterface';
import MessageInterface from '../Containers/Message/MessageInterface';
import { Notification } from '../Models/Notification';
import Modals from '../Containers/Layout/Modals';
import { Event } from '../Models/Event';
import { Follows } from '../Actions/User';
import { useSocket } from './CustomHooks';
import { Session } from '../Models/Session';

interface SiteRouteProps extends RouteProps{
  routeType: string;
  component: (props?: ComponentProps<any>) => JSX.Element;
  path?: string;
  isLogedIn: boolean;
  isAdmin: boolean;
  computedMatch?: {
    isExact: boolean;
    params: object;
    path: string;
    url: string;
  };
  checkIfLogedIn: () => void;
  setHeight: (height: number) => void;
  height: number;
  checkIfResized: () => void;
  unsetRedirect: () => void;
  notifications: Notification[];
  getNotifications: (offset: number) => void;
  socket: any;
  createSocket: () => void;
  userId: string;
  getFollows: () => void;
  addNotification: (notification: Notification) => void;
  getFollowingEvents: (offset: number) => void;
  setEvent: (event: Event) => void;
  updateFollowSessions: (session: Session) => void;
  setFollowSessions: (sessions: Session[]) => void;
  updateFollows: (follows: Follows) => void;
}

export default function SiteRoute({
  routeType, component: Component, path, isLogedIn, isAdmin, computedMatch, getFollowingEvents, updateFollows,
  checkIfLogedIn, setHeight, height, checkIfResized, unsetRedirect, setEvent, setFollowSessions, updateFollowSessions,
  getNotifications, socket, createSocket, userId, getFollows, addNotification, ...rest
}: SiteRouteProps): JSX.Element {
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
    checkIfLogedIn();
    unsetRedirect();
    if (height === 0) {
      setHeight(window.innerHeight);
    }
  });

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

  const params = computedMatch ? computedMatch.params : undefined;
  /* eslint-disable  no-nested-ternary */
  return (
    <Route
      path={path}
      {...rest}
      render={props => (
        <div className="App">
          <Header />
          <SearchBar path={path || '/'} />
          <div className="content">
            <MessageInterface />
            { routeType === 'ADMIN'
              ? isLogedIn && isAdmin
                ? <Component {...props} params={params} />
                : <Redirect to="/" />
              : null
            }
            { routeType === 'PROTECTED'
              ? isLogedIn
                ? <Component {...props} params={params} />
                : <Redirect to="/" />
              : null
            }
            { routeType === 'PUBLIC'
              ? <Component {...props} params={params} />
              : null
            }
          </div>
          <Footer />
          <Modals />
          <PlaybackInterface />
          <MenuInterFace />
        </div>
      )}
    />
  );
}
