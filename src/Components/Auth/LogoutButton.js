import React from 'react';
import PropTypes from 'prop-types';
import { scrollToTop } from '../../Helpers/UserAgent';

function LogoutButton({ atemptLogout, isLogedIn }) {
  function logout() {
    atemptLogout();
    scrollToTop();
  }

  return isLogedIn ? (
    <li><button type="button" className="logout-button" onClick={logout}>Logout</button></li>
  ) : null;
}

LogoutButton.propTypes = {
  atemptLogout: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};

export default LogoutButton;
