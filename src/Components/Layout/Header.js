import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Icons/logo.png';

const Header = ({ toggleLogin, isLogedIn }) => (
  <header>
    <figure>
      <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
    </figure>
    <div>
      <Link to="/">
        <h1 className="site-title">Thru the Ether</h1>
        <p> – a podcast community</p>
      </Link>
    </div>
    <div className={isLogedIn ? 'notifications-button' : 'login-button'}>
      { isLogedIn
        ? <button type="button" />
        : <button type="button" onClick={toggleLogin}>Login</button>
      }

    </div>
  </header>
);

Header.propTypes = {
  toggleLogin: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
};

export default Header;
