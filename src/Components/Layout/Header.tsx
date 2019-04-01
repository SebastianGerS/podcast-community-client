import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Icons/logo.svg';

interface Props {
  toggleLogin: () => void;
  isLogedIn: boolean;
  toggleNotifications: () => void;
}

const Header = ({ toggleLogin, isLogedIn, toggleNotifications }: Props): JSX.Element => (
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
        ? <button type="button" aria-label="toggle-notifications" onClick={toggleNotifications} />
        : <button type="button" name="toggle-login-modal-button" onClick={toggleLogin}>Login</button>
      }

    </div>
  </header>
);

export default Header;
