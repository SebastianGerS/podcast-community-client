import React from 'react';
import { scrollToTop } from '../../Helpers/UserAgent';

interface Props {
  attemptLogout: () => void;
  toggleMenu: () => void;
  isLogedIn: boolean;
}

function LogoutButton({ attemptLogout, isLogedIn, toggleMenu }: Props): JSX.Element | null {
  function logout(): void {
    attemptLogout();
    scrollToTop();
    toggleMenu();
  }

  return isLogedIn ? (
    <li><button type="button" className="logout-button" onClick={logout}>Logout</button></li>
  ) : null;
}

export default LogoutButton;
