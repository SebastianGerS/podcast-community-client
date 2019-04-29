import React from 'react';
import { Flipped } from 'react-flip-toolkit';

interface Props {
  openMenu: () => void;
}

const MenuBar = ({ openMenu }: Props): JSX.Element => (
  <Flipped flipId="menu">
    <nav className="menu bottom-1 bar">
      <Flipped inverseFlipId="menu" scale>
        <button className="menu-button" type="button" onClick={openMenu}>Menu</button>
      </Flipped>
    </nav>
  </Flipped>
);

export default MenuBar;
