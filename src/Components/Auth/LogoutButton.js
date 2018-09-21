import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scrollToTop } from '../../Helpers/UserAgent';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const { atemptLogout } = this.props;
    atemptLogout();
    scrollToTop();
  }

  render() {
    const { isLogedIn } = this.props;

    return isLogedIn ? (
      <li><button type="button" className="logout-button" onClick={this.logout}>Logout</button></li>
    ) : null;
  }
}
LogoutButton.propTypes = {
  atemptLogout: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,

};
export default LogoutButton;
