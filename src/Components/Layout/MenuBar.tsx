import React from 'react';

interface Props {
  openMenu: () => void;
}

const MenuBar = ({ openMenu }: Props): JSX.Element => (
  <nav className="menu bottom-1 bar">
    <button className="menu-button" type="button" onClick={openMenu}>Menu</button>
  </nav>
);

export default MenuBar;
