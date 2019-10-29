import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRequiredRole } from '../hoc/with-required-role';

import { Home } from '../pages/home';
import { ProductsPage } from '../pages/products';
import { UsersPage } from '../pages/users';
import Page404 from '~/components/pages/404-component';

import { Header } from '../common/header';
import { OrdersPage } from './orders';
import { InvoicesPage } from './invoices';
import { UserRole } from '~/helpers';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  authorize?: UserRole[];
  disabled?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/users',
    component: UsersPage,
    authorize: ['admin'],
  },
  {
    path: '/products/:categoryId?',
    component: ProductsPage,
  },
  {
    path: '/orders',
    component: OrdersPage,
  },
  { path: '/invoices', component: InvoicesPage },
];

const Routes = React.memo(() => {
  return (
    <>
      <Router>
        <Header />
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
