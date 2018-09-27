import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Containers/Header';
import SearchBar from '../Containers/SearchBar';
import PlaybackInterface from '../Containers/PlaybackInterface';
import Footer from '../Components/Layout/Footer';
import MenuModal from '../Components/Layout/MenuModal';
import MenuBar from '../Containers/MenuBar';
import MessageInterface from '../Containers/MessageInterface';

export default class AuthSiteRoute extends React.Component {
  componentWillMount() {
    const {
      checkIfLogedIn, setHeight, height, checkIfResized,
    } = this.props;
    if (!height) {
      setHeight(window.innerHeight);
      checkIfResized();
    }

    checkIfLogedIn();
  }

  componentWillUpdate() {
    const { checkIfLogedIn } = this.props;
    checkIfLogedIn();
  }

  toggleModal(name) {
    const { modals } = this.state;
    const newModalstate = modals.map((modal) => {
      if (modal.name === name && !modal.active) {
        return { name: modal.name, active: true };
      }
      return { name: modal.name, active: false };
    });

    this.setState({
      modals: [
        ...newModalstate,
      ],
    });
  }

  render() {
    const {
      component: Component, path, menuIsActive, isLogedIn, computedMatch, ...rest
    } = this.props;
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
              { isLogedIn
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
}

AuthSiteRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  menuIsActive: PropTypes.bool.isRequired,
};
