import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Icons/logo.svg';
import NotificationsButton from '../../Containers/Notifications/NotificationsButton';
import LoginButton from '../../Containers/Auth/LoginButton';

interface Props {
  isLogedIn: boolean;
}

const Header = ({ isLogedIn }: Props): JSX.Element => (
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
    { isLogedIn
      ? <NotificationsButton />
      : <LoginButton />
    }
  </header>
);

export default Header;
