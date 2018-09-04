import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Views from './Views';
import SiteRoute from './Helpers/Routes';

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
    </Switch>
  </BrowserRouter>
);

export default Router;
