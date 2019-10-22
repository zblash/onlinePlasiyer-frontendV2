import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from '~/utils';
import { UserRoleResponse } from '~/backend-model-helpers';
import { withAuthUser, WithAuthUserComponentProps } from './with-auth-user';
import { FullScreenLoading } from '../common/full-screen-loading';

const withRequiredRole = <T, C>(
  WrappedComponent: React.ComponentClass<T> | React.FunctionComponent<T>,
  {
    authorize,
  }: {
    authorize?: UserRoleResponse[];
  },
) => {
  const WithRequiredRoleHoc: React.SFC<
    React.ComponentProps<typeof WrappedComponent> & WithAuthUserComponentProps
  > = props => {
    const { user, isUserLoading, isLoggedIn } = props;

    const shouldAuth = Array.isArray(authorize);
    const wrappedElement = <WrappedComponent {...props} />;
    if (!shouldAuth) {
      return wrappedElement;
    }
    if (isUserLoading) {
      return <FullScreenLoading />;
    }

    if (!isLoggedIn || (!user && isLoggedIn) || (Array.isArray(authorize) && !authorize.includes(user.role))) {
      return <Redirect to="/" />;
    }

    return wrappedElement;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (WithRequiredRoleHoc as any).displayName = `withRequredRole(${getDisplayName(WrappedComponent)})`;

  return withAuthUser(WithRequiredRoleHoc);
};

export { withRequiredRole };
