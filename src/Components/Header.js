import React from 'react';
import PropTypes from 'prop-types';
import logo from '../Assets/Icons/logo.png';

const Header = ({ toggleModal }) => (
  <header>
    <figure>
      <img src={logo} className="logo" alt="logo" />
    </figure>
    <div>
      <h1 className="site-title">Thrue the Ether</h1>
      <p> – a podcast community</p>
    </div>
    <div>
      <button type="button" onClick={() => toggleModal('loginModal')}>Login</button>
    </div>
  </header>
);

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Header;
