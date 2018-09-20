import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Views from './Views';
import SiteRoute from './Containers/SiteRoute';
import AuthSiteRoute from './Containers/AuthSiteRoute';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <SiteRoute
        exact
        path="/"
        component={Views.Home}
      />
      <SiteRoute
        path="/search"
        component={Views.Search}
      />
      <SiteRoute
        path="/register"
        component={Views.Register}
      />
      <AuthSiteRoute
        path="/profile/:userId"
        component={Views.Profile}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
