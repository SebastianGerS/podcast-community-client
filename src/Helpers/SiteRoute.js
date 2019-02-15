import React, { useEffect } from 'react';
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

export default function SiteRoute({
  component: Component, path, menuIsActive, loginModalIsActive,
  computedMatch, checkIfLogedIn, setHeight, height, checkIfResized, ...rest
}) {
  useEffect(() => {
    if (!height) {
      setHeight(window.innerHeight);
      checkIfResized();
    }

    checkIfLogedIn();
  }, []);

  useEffect(() => {
    checkIfLogedIn();
  });

  return (
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
}

SiteRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.bool.isRequired,
  menuIsActive: PropTypes.bool.isRequired,
  loginModalIsActive: PropTypes.bool.isRequired,
  computedMatch: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    path: PropTypes.bool.isRequired,
    url: PropTypes.bool.isRequired,
  }).isRequired,
  checkIfLogedIn: PropTypes.func.isRequired,
  setHeight: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  checkIfResized: PropTypes.bool.isRequired,
};
