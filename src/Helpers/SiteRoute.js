import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Containers/Header';
import SearchBar from '../Containers/SearchBar';
import PlaybackInterface from '../Containers/PlaybackInterface';
import Footer from '../Components/Layout/Footer';
import MenuModal from '../Components/Layout/MenuModal';
import LoginModal from '../Components/Auth/LoginModal';
import MenuBar from '../Containers/MenuBar';
import MessageInterface from '../Containers/MessageInterface';

export default function SiteRoute({
  routeType, component: Component, path, menuIsActive, loginModalIsActive, isLogedIn, isAdmin,
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
  /* eslint-disable  no-nested-ternary */
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
            { routeType === 'ADMIN'
              ? isLogedIn && isAdmin
                ? <Component {...props} params={computedMatch.params} />
                : <Redirect to="/" />
              : null
            }
            { routeType === 'PROTECTED'
              ? isLogedIn
                ? <Component {...props} params={computedMatch.params} />
                : <Redirect to="/" />
              : null
            }
            { routeType === 'PUBLIC'
              ? <Component {...props} params={computedMatch.params} />
              : null
            }
          </div>
          <Footer />
          { !isLogedIn && loginModalIsActive && <LoginModal /> }
          <PlaybackInterface />
          { menuIsActive ? <MenuModal /> : <MenuBar /> }
        </div>
      )}
    />
  );
}

SiteRoute.propTypes = {
  routeType: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  menuIsActive: PropTypes.bool.isRequired,
  loginModalIsActive: PropTypes.bool.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  computedMatch: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  checkIfLogedIn: PropTypes.func.isRequired,
  setHeight: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  checkIfResized: PropTypes.func.isRequired,
};
