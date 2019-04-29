import React from 'react';
import Header from '../../Containers/Layout/Header';
import SearchBar from '../../Containers/Search/SearchBar';
import PlaybackInterface from '../../Containers/Playback/PlaybackInterface';
import Footer from './Footer';
import MenuInterFace from '../../Containers/Layout/MenuInterface';
import MessageInterface from '../../Containers/Message/MessageInterface';
import Modals from '../../Containers/Layout/Modals';

interface Props {
  path?: string;
  children: JSX.Element;
}

function Layout({ path, children }: Props): JSX.Element {
  return (
    <div className="App">
      <Header />
      <SearchBar path={path || '/'} />
      <div className="content">
        <MessageInterface />
        {children}
      </div>
      <Footer />
      <Modals />
      <PlaybackInterface />
      <MenuInterFace />
    </div>
  );
}

export default Layout;
