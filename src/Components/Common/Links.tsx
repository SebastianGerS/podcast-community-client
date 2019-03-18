import React from 'react';
import { Link } from 'react-router-dom';

interface SiteLinkProps {
  to: string;
  title: string;
  closeMenu: () => void;
}

export const ConnectedSiteLink = ({ to, title, closeMenu }: SiteLinkProps): JSX.Element => (
  <li>
    <Link to={to} onClick={closeMenu}>
      {title}
    </Link>
  </li>
);

interface AuthSiteLinkProps extends SiteLinkProps {
  isLogedIn: boolean;
}

export const ConnectedAuthSiteLink = ({
  to, title, closeMenu, isLogedIn,
}: AuthSiteLinkProps): JSX.Element | null => (isLogedIn ? (
  <li>
    <Link to={to} onClick={closeMenu}>
      {title}
    </Link>
  </li>

) : null);

interface AdminSiteLinkProps extends AuthSiteLinkProps {
  isAdmin: boolean;
}

export const ConnectedAdminSiteLink = ({
  to, title, closeMenu, isLogedIn, isAdmin,
}: AdminSiteLinkProps): JSX.Element | null => (isLogedIn && isAdmin ? (
  <li>
    <Link to={to} onClick={closeMenu}>
      {title}
    </Link>
  </li>

) : null);
