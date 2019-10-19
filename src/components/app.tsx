import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RouteChange, Query } from '~/components/common';
import { UserRoleResponse } from '~/backend-model-helpers';
import { queryEndpoints } from '~/services';
import { withRequiredRole } from './hoc/with-required-role';
import { withHeader } from './hoc/with-header';

import Home from './pages/home';
import Page404 from '~/components/pages/404-component';
import Categories from '~/components/pages/categories';
import CategoryDetail from '~/components/pages/category-detail';
import CreateProduct from '~/components/pages/create-products';
import Users from '~/components/pages/users';
import Products from '~/components/pages/products';
import CustomerBasket from '~/components/pages/customer-basket';
import { FullScreenLoading } from './common/full-screen-loading';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  shouldLogin: boolean;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

const App = () => {
  const routes: IRoute[] = [
    {
      path: '/',
      component: withHeader(Home),
      shouldLogin: false,
    },
    {
      path: '/admin/categories',
      component: withHeader(Categories),
      shouldLogin: true,
      authorize: ['ADMIN'],
    },
    {
      path: '/admin/category/:id',
      component: withHeader(CategoryDetail),
      shouldLogin: true,
      authorize: ['ADMIN'],
      disabled: true,
    },
    {
      path: '/admin/users/',
      component: withHeader(Users),
      shouldLogin: true,
      authorize: ['ADMIN'],
    },
    {
      path: '/admin/products/',
      component: withHeader(Products),
      shouldLogin: true,
      authorize: ['ADMIN', 'CUSTOMER'],
    },
    {
      path: '/products/create/:barcode?',
      component: withHeader(CreateProduct),
      shouldLogin: true,
      authorize: ['ADMIN', 'MERCHANT'],
    },
    {
      path: '/customer/basket',
      component: withHeader(CustomerBasket),
      shouldLogin: true,
      authorize: ['CUSTOMER'],
    },
  ];
  const app = (
    <Router>
      <Switch>
        {routes.map(route =>
          route.disabled ? null : (
            <Route
              key={route.path}
              path={route.path}
              component={withRequiredRole(route.component, {
                authorize: route.authorize,
                showLoginPopup: route.shouldLogin,
              })}
              exact
            />
          ),
        )}
        <Route component={Page404} />
        <RouteChange />
      </Switch>
    </Router>
  );

  const [showLoading, setShowLoading] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setShowLoading(true);
    }, 1000);
  }, []);

  return (
    <Query query={queryEndpoints.checkHealth}>
      {({ loading, error }) => {
        if (loading) {
          return showLoading ? <FullScreenLoading /> : null;
        }

        if (error) {
          return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
        }

        return app;
      }}
    </Query>
  );
};

export default App;
