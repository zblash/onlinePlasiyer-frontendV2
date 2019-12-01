import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from '~/utils';
import { useApplicationContext } from '~/app/context';
import { UserRoleResponse } from '~/services/helpers/backend-models';
import { usePopupContext } from '~/contexts/popup/context';

const withRequiredRole = <T, C>(
  WrappedComponent: React.ComponentClass<T> | React.FunctionComponent<T>,
  {
    authorize,
  }: {
    authorize?: UserRoleResponse[];
  },
) => {
  const WithRequiredRoleHoc: React.SFC<React.ComponentProps<typeof WrappedComponent>> = props => {
    const { user } = useApplicationContext();
    const popups = usePopupContext();
    const shouldAuth = Array.isArray(authorize);
    const wrappedElement = <WrappedComponent {...props} />;
    React.useEffect(() => {
      if (user.role === 'MERCHANT' && user.activeStates.length === 0 && !popups.addActiveState.isShown) {
        popups.addActiveState.show();
      }
    }, [popups.addActiveState, user.activeStates, user.role]);
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
