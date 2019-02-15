import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Containers/Header';
import SearchBar from '../Containers/SearchBar';
import PlaybackInterface from '../Containers/PlaybackInterface';
import Footer from '../Components/Layout/Footer';
import MenuModal from '../Components/Layout/MenuModal';
import MenuBar from '../Containers/MenuBar';
import MessageInterface from '../Containers/MessageInterface';

export default function AdminAuthSiteRoute({
  component: Component, path, menuIsActive, isLogedIn, isAdmin,
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
      computedMatch={computedMatch}
      {...rest}
      render={props => (
        <div className="App">
          <Header />
          <SearchBar path={path} />
          <div className="content">
            <MessageInterface />
            { isLogedIn && isAdmin
              ? <Component {...props} params={computedMatch.params} />
              : <Redirect to="/" />
            }
          </div>
          <Footer />
          <PlaybackInterface />
          { menuIsActive ? <MenuModal /> : <MenuBar /> }
        </div>
      )}
    />
  );
}

AdminAuthSiteRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.bool.isRequired,
  menuIsActive: PropTypes.bool.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
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
