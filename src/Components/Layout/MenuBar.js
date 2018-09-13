import React from 'react';
import PropTypes from 'prop-types';

const MenuBar = ({ openMenu }) => (
  <nav className="menu bottom-1 bar">
    <button className="menu-button" type="button" onClick={openMenu}>Menu</button>
  </nav>
);


MenuBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
};

export default MenuBar;
