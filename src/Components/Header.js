import React from 'react';
import logo from '../Assets/Images/logo.png';

const Header = () => (
  <header>
    <figure>
      <img src={logo} className="logo" alt="logo" />
    </figure>
    <div>
      <h1 className="site-title">Thrue the Ether</h1>
      <p> – a podcast community</p>
    </div>
    <div>
      <button type="button">Loggin</button>
    </div>
  </header>
);

export default Header;
