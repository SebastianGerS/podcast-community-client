import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const SiteLink = ({ to, title, toggleModal }) => (
  <li>
    <Link to={to} onClick={() => toggleModal('menu')}>
      {title}
    </Link>
  </li>
);

SiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export const ConnectedAuthSiteLink = ({
  to, title, toggleModal, isLogedIn,
}) => (isLogedIn ? (
  <li>
    <Link to={to} onClick={() => toggleModal('menu')}>
      {title}
    </Link>
  </li>

) : null);

ConnectedAuthSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};

export const ConnectedAdminSiteLink = ({
  to, title, toggleModal, isLogedIn,
}) => {
  const admin = true;

  return isLogedIn && admin ? (
    <li>
      <Link to={to} onClick={() => toggleModal('menu')}>
        {title}
      </Link>
    </li>

  ) : null;
};

ConnectedAdminSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};
