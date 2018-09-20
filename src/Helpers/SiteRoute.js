import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../Containers/Header';
import SearchBar from '../Containers/SearchBar';
import PlaybackInterface from '../Containers/PlaybackInterface';
import Footer from '../Components/Layout/Footer';
import LoginModal from '../Components/Auth/LoginModal';
import MenuModal from '../Components/Layout/MenuModal';
import MenuBar from '../Containers/MenuBar';
import MessageInterface from '../Containers/MessageInterface';

const SiteRoute = ({
  component: Component, path, menuIsActive, loginModalIsActive, ...rest
}) => (
  <Route
    path={path}
    {...rest}
    render={props => (
      <div className="App">
        <Header />
        <SearchBar path={path} />
        <div className="content">
          <MessageInterface />
          <Component {...props} />
        </div>
        <Footer />
        { loginModalIsActive && <LoginModal /> }
        <PlaybackInterface />
        { menuIsActive ? <MenuModal /> : <MenuBar /> }
      </div>
    )}
  />
);


SiteRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  menuIsActive: PropTypes.bool.isRequired,
  loginModalIsActive: PropTypes.bool.isRequired,
};

export default SiteRoute;
