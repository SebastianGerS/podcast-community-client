import React, { ComponentProps } from 'react';
import { Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from '../../Containers/Layout/Header';
import SearchBar from '../../Containers/Search/SearchBar';
import PlaybackInterface from '../../Containers/Playback/PlaybackInterface';
import Footer from './Footer';
import MenuInterFace from '../../Containers/Layout/MenuInterface';
import MessageInterface from '../../Containers/Message/MessageInterface';
import Modals from '../../Containers/Layout/Modals';

interface Props {
  routeType: string;
  component: (props?: ComponentProps<any>) => JSX.Element;
  path?: string;
  isLogedIn: boolean;
  isAdmin: boolean;
  params: object | undefined;
}

function Layout({
  path, routeType, isLogedIn, isAdmin, params, component: Component, ...props
}: Props): JSX.Element {
  return (
    <div className="App">
      <Header />
      <SearchBar path={path || '/'} />
      <TransitionGroup component={null}>
        <CSSTransition
          key={`${path || 'home'}-view`}
          in={false}
          appear
          timeout={300}
          classNames="view"
        >
          <div className="content">
            <MessageInterface />
            { routeType === 'ADMIN'
              ? isLogedIn && isAdmin
                ? <Component {...props} params={params} />
                : <Redirect to="/" />
              : routeType === 'PROTECTED'
                ? isLogedIn
                  ? <Component {...props} params={params} />
                  : <Redirect to="/" />
                : <Component {...props} params={params} />
            }
          </div>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
      <Modals />
      <PlaybackInterface />
      <MenuInterFace />
    </div>
  );
}

export default Layout;
