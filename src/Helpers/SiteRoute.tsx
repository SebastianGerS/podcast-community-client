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
}

export default function SiteRoute({
  routeType, component: Component, path, isLogedIn, isAdmin, computedMatch,
  checkIfLogedIn, setHeight, height, checkIfResized, unsetRedirect, notifications,
  getNotifications, socket, createSocket, userId, getFollows, addNotification, getFollowingEvents, ...rest
}: SiteRouteProps): JSX.Element {
  useEffect(() => {
    if (!height) {
      setHeight(window.innerHeight);
      checkIfResized();
    }
    if (isLogedIn) {
      getNotifications(0);
      getFollows();
    }
  }, []);

  useEffect(() => {
    checkIfLogedIn();
    unsetRedirect();
    if (height === 0) {
      setHeight(window.innerHeight);
    }
  });

  useEffect(() => {
    if (!socket) {
      createSocket();
    }
    if (notifications.length === 0 && isLogedIn) {
      getNotifications(0);
    }
    if (isLogedIn) {
      getFollows();
      getFollowingEvents(0);
    }

    if (socket && isLogedIn && !socket.hasListeners(`user/${userId}/notification`)) {
      socket.on(`user/${userId}/notification`, addNotification);
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
