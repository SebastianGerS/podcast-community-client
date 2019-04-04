import React, { useEffect, ComponentProps } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Header from '../Containers/Layout/Header';
import SearchBar from '../Containers/Search/SearchBar';
import PlaybackInterface from '../Containers/Playback/PlaybackInterface';
import Footer from '../Components/Layout/Footer';
import MenuModal from '../Components/Layout/MenuModal';
import LoginModal from '../Components/Auth/LoginModal';
import MenuBar from '../Containers/Layout/MenuBar';
import MessageInterface from '../Containers/Message/MessageInterface';
import NotificationsModal from '../Components/Notifications/NotificationsModal';
import { Notification } from '../Models/Notification';
import MoreOptionsModal from '../Components/Common/MoreOptions/MoreOptionsModal';

interface SiteRouteProps extends RouteProps{
  routeType: string;
  component: (props?: ComponentProps<any>) => JSX.Element;
  path?: string;
  menuIsActive: boolean;
  loginModalIsActive: boolean;
  notificationsModalIsActive: boolean;
  moreOptionsModalIsActive: boolean;
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
  createSocket: (userId: string) => void;
  userId: string;
}

export default function SiteRoute({
  routeType, component: Component, path, menuIsActive, loginModalIsActive, isLogedIn, isAdmin,
  computedMatch, checkIfLogedIn, setHeight, height, checkIfResized, unsetRedirect, moreOptionsModalIsActive,
  notificationsModalIsActive, notifications, getNotifications, socket, createSocket, userId, ...rest
}: SiteRouteProps): JSX.Element {
  useEffect(() => {
    if (!height) {
      setHeight(window.innerHeight);
      checkIfResized();
    }
    if (isLogedIn) {
      getNotifications(0);
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
    if (isLogedIn && !socket) {
      createSocket(userId);
    }
    if (notifications.length === 0 && isLogedIn) {
      getNotifications(0);
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
          { !isLogedIn && loginModalIsActive && <LoginModal /> }
          { isLogedIn && notificationsModalIsActive && <NotificationsModal /> }
          { isLogedIn && moreOptionsModalIsActive && <MoreOptionsModal />}
          <PlaybackInterface />
          { menuIsActive ? <MenuModal /> : <MenuBar /> }
        </div>
      )}
    />
  );
}
