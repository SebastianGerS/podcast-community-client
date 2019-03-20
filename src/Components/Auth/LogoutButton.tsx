import React from 'react';
import { scrollToTop } from '../../Helpers/UserAgent';

interface Props {
  attemptLogout: () => void;
  isLogedIn: boolean;
}

function LogoutButton({ attemptLogout, isLogedIn }: Props): JSX.Element | null {
  function logout(): void {
    attemptLogout();
    scrollToTop();
  }

  return isLogedIn ? (
    <li><button type="button" className="logout-button" onClick={logout}>Logout</button></li>
  ) : null;
}

export default LogoutButton;
