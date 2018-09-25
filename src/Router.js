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
      <AuthSiteRoute
        exact
        path="/my-subscriptions"
        component={Views.MySubscriptions}
      />
      <AuthSiteRoute
        path="/my-subscriptions/categories/:categoryId"
        component={Views.Category}
      />
      <AuthSiteRoute
        path="/settings"
        component={Views.Settings}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
