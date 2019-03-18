import React from 'react';
import { SiteLink, AuthSiteLink, AdminSiteLink } from '../../Containers/Links';
import LogoutButton from '../../Containers/LogoutButton';

interface Props {
  closeMenu: () => void;
  userId: string;
}
const Menu = ({ closeMenu, userId }: Props): JSX.Element => (
  <nav className="menu">
    <button className="menu-button" type="button" onClick={closeMenu}>Menu</button>
    <ul className="menu-links">
      <div>
        <SiteLink to="/search" title="Search" />
        <AdminSiteLink to="/users" title="Handle Users" />
        <AuthSiteLink to={`/profile/${userId}`} title="Profile" />
        <AuthSiteLink to="/my-subscriptions" title="Subscriptions" />
        <AuthSiteLink to="/" title="Feed" />
      </div>
      <div>
        <AuthSiteLink to="/" title="ListenList" />
        <AuthSiteLink to="/" title="Follows" />
        <AuthSiteLink to="/settings" title="Settings" />
        <AdminSiteLink to="/" title="Send Email" />
        <LogoutButton />
      </div>
    </ul>
  </nav>
);

export default Menu;
