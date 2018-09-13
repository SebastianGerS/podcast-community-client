import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ConnectedSiteLink = ({ to, title, closeMenu }) => (
  <li>
    <Link to={to} onClick={closeMenu}>
      {title}
    </Link>
  </li>
);

ConnectedSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export const ConnectedAuthSiteLink = ({
  to, title, closeMenu, isLogedIn,
}) => (isLogedIn ? (
  <li>
    <Link to={to} onClick={closeMenu}>
      {title}
    </Link>
  </li>

) : null);

ConnectedAuthSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};

export const ConnectedAdminSiteLink = ({
  to, title, closeMenu, isLogedIn,
}) => {
  const admin = true;

  return isLogedIn && admin ? (
    <li>
      <Link to={to} onClick={closeMenu}>
        {title}
      </Link>
    </li>

  ) : null;
};

ConnectedAdminSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};
