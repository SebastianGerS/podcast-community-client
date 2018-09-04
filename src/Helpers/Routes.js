import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import PlaybackCenter from '../Components/PlaybackCenter';
import Footer from '../Components/Footer';
import LoginModal from '../Components/LoginModal';

class SiteRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modals:
        [
          { name: 'loginModal', active: false },
          { name: 'playbackModal', active: false },
        ],
    };
    this.toggleModal = this.toggleModal.bind(this);
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
    const { component: Component, path, ...rest } = this.props;
    const { modals } = this.state;
    const [loginModalIsActive, playbackModalIsActive] = modals;
    return (
      <Route
        path={path}
        {...rest}
        render={props => (
          <div className="App">
            <Header toggleModal={this.toggleModal} />
            <SearchBar />
            <div className="content">
              <h2 className="page-header">{path === '/' ? 'Home' : `${path.charAt(1).toUpperCase()}${path.slice(2)}`}</h2>
              <Component {...props} />
            </div>
            <Footer />
            {loginModalIsActive.active && <LoginModal />}
            <PlaybackCenter
              toggleModal={this.toggleModal}
              modalIsActive={playbackModalIsActive.active}
            />
          </div>
        )}
      />
    );
  }
}

export default SiteRoute;
