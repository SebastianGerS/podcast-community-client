import React, { useEffect, ComponentProps } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { RedirectModel } from '../Models/Redirect';

interface SiteRouteProps extends RouteProps{
  routeType: string;
  component: (props?: ComponentProps<any>) => JSX.Element;
  path?: string;
  isLogedIn: boolean;
  isAdmin: boolean;
  computedMatch?: {
    isExact: boolean;
    params: object;
    path: string;
    url: string;
  };
  checkIfLogedIn: () => void;
  unsetRedirect: () => void;
  redirect: RedirectModel;
}

export default function SiteRoute({
  routeType, component: Component, path, isLogedIn, isAdmin, computedMatch,
  redirect, checkIfLogedIn, unsetRedirect, ...rest
}: SiteRouteProps): JSX.Element {
  useEffect(() => {
    checkIfLogedIn();
  }, [path]);

  useEffect(() => {
    if (typeof redirect.to === 'string') {
      unsetRedirect();
    }
  }, [redirect]);

  const params = computedMatch ? computedMatch.params : undefined;
  /* eslint-disable  no-nested-ternary */
  return typeof redirect.to !== 'string' ? (
    <Route
      path={path}
      {...rest}
      render={props => (
        routeType === 'ADMIN'
          ? isLogedIn && isAdmin
            ? <Component {...props} params={params} />
            : <Redirect to="/" />
          : routeType === 'PROTECTED'
            ? isLogedIn
              ? <Component {...props} params={params} />
              : <Redirect to="/" />
            : <Component {...props} params={params} />
      )}
    />
  ) : <Redirect to={redirect.to} />;
}
