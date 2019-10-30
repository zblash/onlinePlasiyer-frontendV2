import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from '~/utils';
import { UserRole } from '~/helpers';
import { useApplicationContext } from '~/app/context';

const withRequiredRole = <T, C>(
  WrappedComponent: React.ComponentClass<T> | React.FunctionComponent<T>,
  {
    authorize,
  }: {
    authorize?: UserRole[];
  },
) => {
  const WithRequiredRoleHoc: React.SFC<React.ComponentProps<typeof WrappedComponent>> = props => {
    const { user } = useApplicationContext();

    const shouldAuth = Array.isArray(authorize);
    const wrappedElement = <WrappedComponent {...props} />;
    if (!shouldAuth) {
      return wrappedElement;
    }
    if (Array.isArray(authorize) && !authorize.includes(user.role)) {
      return <Redirect to="/" />;
    }

    return wrappedElement;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (WithRequiredRoleHoc as any).displayName = `withRequredRole(${getDisplayName(WrappedComponent)})`;

  return WithRequiredRoleHoc;
};

export { withRequiredRole };
