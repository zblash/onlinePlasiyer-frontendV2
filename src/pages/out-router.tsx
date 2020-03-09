import React from 'react';
import { Switch, Route } from 'react-router';

interface IRoute {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
}

const LoginPage = React.lazy(() => import('./login').then(module => ({ default: module.LoginPage })));
const RegisterPage = React.lazy(() => import('./register').then(module => ({ default: module.RegisterPage })));
const routes: IRoute[] = [
  { path: '/', component: LoginPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
];
const OutRouter = React.memo(() => {
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} path={route.path} component={route.component} exact />
        ))}
      </Switch>
    </React.Suspense>
  );
});

export default OutRouter;
