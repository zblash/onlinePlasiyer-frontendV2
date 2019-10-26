import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { queryEndpoints } from '~/services';
import { withRequiredRole } from './hoc/with-required-role';

import Page404 from '~/components/pages/404-component';
import { FullScreenLoading } from './common/full-screen-loading';
import routes from './routes';
import { useQuery } from '~/cache-management/hooks';

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
  const [_, loading, error] = useQuery(queryEndpoints.checkHealth, {
    onCompleted: () => {
      setTimeout(() => {
        setShowLoading(false);
      }, 1000);
    },
  });

  if (loading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
  }

  return (
    <>
      {showLoading && <FullScreenLoading />}
      {app}
    </>
  );
};

export default App;
