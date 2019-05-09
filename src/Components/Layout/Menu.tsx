import React from 'react';
import { SiteLink, AuthSiteLink, AdminSiteLink } from '../../Containers/Common/Links';
import LogoutButton from '../../Containers/Auth/LogoutButton';

interface Props {
  closeMenu: () => void;
  userId: string;
}
const Menu = ({ closeMenu, userId }: Props): JSX.Element => (
  <div className="menu-modal">
    <button
      title="close"
      className="close-menu-modal-button"
      type="button"
      aria-label="close-menu-modal-button"
      onClick={closeMenu}
    />
    <nav className="menu">
      <button className="menu-button" type="button" onClick={closeMenu}>Menu</button>
      <ul className="menu-links">
        <div>
          <SiteLink to="/search" title="Search" />
          <AuthSiteLink to={`/profile/${userId}`} title="Profile" />
          <AuthSiteLink to="/my-subscriptions" title="Subscriptions" />
          <AuthSiteLink to="/feed" title="Feed" />
        </div>
        <div>
          {/* <AuthSiteLink to="/" title="ListenList" /> */}
          <AuthSiteLink to="/follows" title="Follows" />
          <AuthSiteLink to="/settings" title="Settings" />
          <AdminSiteLink to="/users" title="Handle Users" />
          {/* <AdminSiteLink to="/" title="Send Email" /> */}
          <LogoutButton />
        </div>
      </ul>
    </nav>
  </div>
);

export default Menu;
