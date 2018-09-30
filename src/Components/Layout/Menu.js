import React from 'react';
import PropTypes from 'prop-types';
import { SiteLink, AuthSiteLink, AdminSiteLink } from '../../Containers/Links';
import LogoutButton from '../../Containers/LogoutButton';

const Menu = ({ closeMenu, userId }) => (
  <nav className="menu">
    <button className="menu-button" type="button" onClick={closeMenu}>Menu</button>
    <ul className="menu-links">
      <div>
        <SiteLink to="/search" title="Search" />
        <AdminSiteLink to="/users" title="Handle Users" />
        <AdminSiteLink to="/" title="Send Email" />
        <AuthSiteLink to={`/profile/${userId}`} title="Profile" />
        <AuthSiteLink to="/my-subscriptions" title="Subscriptions" />
      </div>
      <div>
        <AuthSiteLink to="/" title="Feed" />
        <AuthSiteLink to="/" title="ListenList" />
        <AuthSiteLink to="/" title="Follows" />
        <AuthSiteLink to="/settings" title="Settings" />
        <LogoutButton />
      </div>
    </ul>
  </nav>
);

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

export default Menu;
