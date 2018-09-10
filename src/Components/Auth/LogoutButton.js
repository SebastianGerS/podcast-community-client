import React, { Component } from 'react';
import PropTypes from 'prop-types';


class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { toggleModal, atemptLogout } = this.props;

    atemptLogout();
    toggleModal('menu');
  }

  render() {
    const { isLogedIn } = this.props;

    return isLogedIn ? (
      <li><button type="button" className="logout-button" onClick={this.logout}>Logout</button></li>
    ) : null;
  }
}
LogoutButton.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  atemptLogout: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,

};
export default LogoutButton;
