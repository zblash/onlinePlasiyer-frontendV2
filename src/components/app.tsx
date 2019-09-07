import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '~/assets/scss/app.scss';
import { RouteChange, Query } from '~/components/common';
import { UserRole } from '~/__types';
import { withRequiredRole } from '~/components/hoc';
import services from '~/services';

import Home from '~/components/pages/home';
import About from '~/components/pages/about';
import Profile from '~/components/pages/profile';
import Page404 from '~/components/pages/404-component';
import Categories from '~/components/pages/categories';
import CategoryDetail from '~/components/pages/category-detail';
interface IRoute {
  path: string;
  component: React.ComponentClass;
  shouldLogin: boolean;
  authorize?: UserRole[];
}
function App() {
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
    },
  ];
  return (
    <React.Fragment>
      <Query query={() => services.checkHealth()}>
        {({ data, loading, error }) => {
          if (loading) {
            return <h1>loading</h1>;
          }
          if (error) {
            return <h1>Sunucuda bir sorun olustu lutfen Bize bildir</h1>;
          }
          return (
            <Router>
              <Switch>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    component={withRequiredRole(route.component, {
                      authorize: route.authorize,
                      showLoginPopup: route.shouldLogin,
                    })}
                    exact
                  />
                ))}
                <Route component={Page404} />
                <RouteChange />
              </Switch>
            </Router>
          );
        }}
      </Query>
    </React.Fragment>
  );
}

export default App;
