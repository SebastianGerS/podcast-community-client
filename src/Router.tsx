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
        path="/episodes/:episodeId"
        routeType="PUBLIC"
        component={Views.Episodes}
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
        path="/follows/:tabIndex?"
        routeType="PROTECTED"
        component={Views.Follows}
      />
      <SiteRoute
        path="/feed"
        routeType="PROTECTED"
        component={Views.Feed}
      />
      <SiteRoute
        path="/users"
        routeType="ADMIN"
        component={Views.Users}
      />
      <SiteRoute
        routeType="PUBLIC"
        component={Views.Error}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
