import React from 'react';
import logo from '../Assets/Images/logo.png';

const Header = () => (
  <header>
    <img src={logo} className="logo" alt="logo" />
    <h1 className="site-title">Thrue the Ether</h1>
  </header>
);

export default Header;
