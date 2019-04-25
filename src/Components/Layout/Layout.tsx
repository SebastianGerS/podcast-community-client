import React, { ComponentProps } from 'react';
import { Redirect } from 'react-router-dom';
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
  );
}

export default Layout;
