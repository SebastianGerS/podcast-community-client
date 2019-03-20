import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Views from './Views';
import SiteRoute from './Containers/Helpers/SiteRoute';

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <SiteRoute
        exact
        path="/"
        routeType="PUBLIC"
        component={Views.Home}
      />
      <SiteRoute
        path="/search"
        routeType="PUBLIC"
        component={Views.Search}
      />
      <SiteRoute
        path="/register"
        routeType="PUBLIC"
        component={Views.Register}
      />
      <SiteRoute
        path="/podcasts/:podcastId"
        routeType="PUBLIC"
        component={Views.Podcasts}
      />
      <SiteRoute
        path="/profile/:userId"
        routeType="PROTECTED"
        component={Views.Profile}
      />
      <SiteRoute
        exact
        path="/my-subscriptions"
        routeType="PROTECTED"
        component={Views.MySubscriptions}
      />
      <SiteRoute
        path="/my-subscriptions/categories/:categoryId"
        routeType="PROTECTED"
        component={Views.Category}
      />
      <SiteRoute
        path="/settings"
        routeType="PROTECTED"
        component={Views.Settings}
      />
      <SiteRoute
        path="/users"
        routeType="ADMIN"
        component={Views.Users}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
