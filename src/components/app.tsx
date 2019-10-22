import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { queryEndpoints } from '~/services';
import { withRequiredRole } from './hoc/with-required-role';

import Page404 from '~/components/pages/404-component';
import { FullScreenLoading } from './common/full-screen-loading';
import { Query } from '~/cache-management/components/query';
import routes from './routes';

const App = () => {
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
              })}
              exact
            />
          ),
        )}
        <Route component={Page404} />
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
