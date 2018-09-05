import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Menu = ({ modalIsActive, toggleModal }) => (
  <div className={`menu ${modalIsActive ? '' : 'bottom-1 bar'}`}>
    <button className="menu-button" type="button" onClick={() => toggleModal('menu')}>Menu</button>
    { modalIsActive
      && (
      <div className="menu-links">
        <div>
          <Link to="/search">Search</Link>
          <Link to="/">Handle Users</Link>
          <Link to="/">Send Email</Link>
          <Link to="/">Profile</Link>
          <Link to="/">Subscribtions</Link>
        </div>
        <div>
          <Link to="/">Feed</Link>
          <Link to="/">ListenList</Link>
          <Link to="/">Follows</Link>
          <Link to="/">Settings</Link>
          <button type="button" className="logout-button">Logout</button>
        </div>
      </div>
      )
    }
  </div>
);

Menu.propTypes = {
  modalIsActive: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Menu;
