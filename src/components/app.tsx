import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '~/assets/scss/app.scss';
import { RouteChange, Query } from '~/components/common';
import { UserRoleResponse } from '~/__types';
import { withRequiredRole } from '~/components/hoc';

import Home from '~/components/pages/home';
import About from '~/components/pages/about';
import Profile from '~/components/pages/profile';
import Page404 from '~/components/pages/404-component';
import Categories from '~/components/pages/categories';
import CategoryDetail from '~/components/pages/category-detail';
import Users from '~/components/pages/users';
import CreateProduct from '~/components/pages/create-products';
import { queryEndpoints } from '~/services';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  shouldLogin: boolean;
  authorize?: UserRoleResponse[];
  disabled?: boolean;
}

class App extends React.Component {
  componentWillUnmount() {}

  render() {
    const routes: IRoute[] = [
      {
        path: '/',
        component: Home,
        shouldLogin: false,
      },
      {
        path: '/about',
        component: About,
        shouldLogin: false,
        authorize: ['ADMIN', 'CUSTOMER', 'MERCHANT'],
      },
      {
        path: '/profile',
        component: Profile,
        shouldLogin: true,
        authorize: ['ADMIN', 'MERCHANT'],
      },
      {
        path: '/admin/categories',
        component: Categories,
        shouldLogin: true,
        authorize: ['ADMIN'],
      },
      {
        path: '/admin/category/:id',
        component: CategoryDetail,
        shouldLogin: true,
        authorize: ['ADMIN'],
        disabled: true,
      },
      {
        path: '/admin/users/',
        component: Users,
        shouldLogin: true,
        authorize: ['ADMIN'],
      },
      {
        path: '/products/create/:barcode?',
        component: CreateProduct,
        shouldLogin: true,
        authorize: ['ADMIN', 'MERCHANT'],
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

    return (
      <Query query={queryEndpoints.checkHealth}>
        {({ loading, error }) => {
          if (loading) {
            return <h1>Baglanti kontrol ediliyor</h1>;
          }

          if (error) {
            return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
          }

          return app;
        }}
      </Query>
    );
  }
}

export default App;
