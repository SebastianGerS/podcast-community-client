import React from 'react';
import PropTypes from 'prop-types';
import { AuthSiteLink, AdminSiteLink } from '../../Containers/Links';
import { SiteLink } from '../../Helpers/Links';
import LogoutButton from '../../Containers/LogoutButton';

const Menu = ({ modalIsActive, toggleModal }) => (
  <nav className={`menu ${modalIsActive ? '' : 'bottom-1 bar'}`}>
    <button className="menu-button" type="button" onClick={() => toggleModal('menu')}>Menu</button>
    { modalIsActive
      && (
      <ul className="menu-links">
        <div>
          <SiteLink to="/search" toggleModal={toggleModal} title="Search" />
          <AdminSiteLink to="/" toggleModal={toggleModal} title="Handle Users" />
          <AdminSiteLink to="/" toggleModal={toggleModal} title="Send Email" />
          <AuthSiteLink to="/" toggleModal={toggleModal} title="Profile" />
          <AuthSiteLink to="/" toggleModal={toggleModal} title="Subscribtions" />
        </div>
        <div>
          <AuthSiteLink to="/" toggleModal={toggleModal} title="Feed" />
          <AuthSiteLink to="/" toggleModal={toggleModal} title="ListenList" />
          <AuthSiteLink to="/" toggleModal={toggleModal} title="Follows" />
          <AuthSiteLink to="/" toggleModal={toggleModal} title="Settings" />
          <LogoutButton toggleModal={toggleModal} />
        </div>
      </ul>
      )
    }
  </nav>
);

Menu.propTypes = {
  modalIsActive: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Menu;
