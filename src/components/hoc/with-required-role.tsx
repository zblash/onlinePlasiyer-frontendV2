import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from '~/utils';
import { UserRoleResponse } from '~/backend-model-helpers';
import { withAuthUser, WithAuthUserComponentProps } from './with-auth-user';

const withRequiredRole = <T, C>(
  WrappedComponent: React.ComponentClass<T> | React.FunctionComponent<T>,
  {
    authorize,
    showLoginPopup,
  }: {
    authorize?: UserRoleResponse[];
    showLoginPopup: boolean;
  } = { showLoginPopup: true },
) => {
  const WithRequiredRoleHoc: React.SFC<
    React.ComponentProps<typeof WrappedComponent> & WithAuthUserComponentProps
  > = props => {
    const { user, isUserLoading, isLoggedIn } = props;

    const shouldAuth = showLoginPopup || Array.isArray(authorize);
    const wrappedElement = <WrappedComponent {...props} />;
    if (!shouldAuth) {
      return wrappedElement;
    }
    if (isUserLoading) {
      return null;
    }

    if (!isLoggedIn || (!user && isLoggedIn)) {
      return (
        // TODO: return login form
        null
      );
    }

    if (Array.isArray(authorize) && !authorize.includes(user.role)) {
      return <Redirect to="/" />;
    }

    return wrappedElement;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (WithRequiredRoleHoc as any).displayName = `withRequredRole(${getDisplayName(WrappedComponent)})`;

  return withAuthUser(WithRequiredRoleHoc);
};

export { withRequiredRole };
