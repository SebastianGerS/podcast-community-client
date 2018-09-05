import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const SiteLink = ({ to, title, toggleModal }) => {
  const logedin = true;
  return logedin ? (
    <li>
      <Link to={to} onClick={() => toggleModal('menu')}>
        {title}
      </Link>
    </li>

  ) : null;
};

SiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
export const AuthSiteLink = ({ to, title, toggleModal }) => {
  const logedin = true;

  return logedin ? (
    <li>
      <Link to={to} onClick={() => toggleModal('menu')}>
        {title}
      </Link>
    </li>

  ) : null;
};

AuthSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export const AdminSiteLink = ({ to, title, toggleModal }) => {
  const logedin = true;
  const admin = true;

  return logedin && admin ? (
    <li>
      <Link to={to} onClick={() => toggleModal('menu')}>
        {title}
      </Link>
    </li>

  ) : null;
};

AdminSiteLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
