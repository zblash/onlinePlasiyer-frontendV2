import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRequiredRole } from '../hoc/with-required-role';

import { withHeader } from '../hoc/with-header';

import Home from '../pages/home';
import { ProductsPage } from '../pages/products';
import Page404 from '~/components/pages/404-component';

import { UserRoleResponse } from '~/backend-model-helpers';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: withHeader(Home),
  },
  {
    path: '/products/:categoryId?',
    component: withHeader(ProductsPage),
    authorize: ['ADMIN', 'CUSTOMER'],
  },
];

const Routes = React.memo(() => {
  return (
    <>
      <Router>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={withRequiredRole(route.component, {
                authorize: route.authorize,
              })}
              exact
            />
          ))}
          <Route component={Page404} />
        </Switch>
      </Router>
    </>
  );
});

export default Routes;
