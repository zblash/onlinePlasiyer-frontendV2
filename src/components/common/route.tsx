import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type Props = RouteProps & {
  redirect?: string;
  isRedirect?: () => boolean;
};
const CustomRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (rest.redirect && rest.isRedirect && rest.isRedirect()) {
          return <Redirect to={rest.redirect} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default CustomRoute;
