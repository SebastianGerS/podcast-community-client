import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Components/Layout/Header';
import SearchBar from '../Components/Search/SearchBar';
import PlaybackCenter from '../Components/Playback/PlaybackCenter';
import Footer from '../Components/Layout/Footer';
import LoginModal from '../Components/Auth/LoginModal';
import Menu from '../Components/Layout/Menu';
import Modal from './Modal';

class SiteRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modals:
        [
          { name: 'login', active: false },
          { name: 'playback', active: false },
          { name: 'menu', active: false },
        ],
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    const { checkIfLogedIn } = this.props;
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
    const { component: Component, path, ...rest } = this.props;
    const { modals } = this.state;
    const [loginModalIsActive, playbackModalIsActive, menuModalIsActive] = modals;
    return (
      <Route
        path={path}
        {...rest}
        render={props => (
          <div className="App">
            <Header toggleModal={this.toggleModal} />
            <SearchBar />
            <div className="content">
              <Component {...props} />
            </div>
            <Footer />
            {loginModalIsActive.active && <LoginModal toggleModal={this.toggleModal} />}
            <PlaybackCenter
              toggleModal={this.toggleModal}
              modalIsActive={playbackModalIsActive.active}
              menuIsActive={menuModalIsActive.active}
            />
            { !menuModalIsActive.active
              ? <Menu modalIsActive={menuModalIsActive.active} toggleModal={this.toggleModal} />
              : <Modal component={Menu} size="medium" backgroundColor="black" modalIsActive={menuModalIsActive.active} toggleModal={this.toggleModal} />
            }
          </div>
        )}
      />
    );
  }
}

export default SiteRoute;
