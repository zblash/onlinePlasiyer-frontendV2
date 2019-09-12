import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from '~/utils';
import { Query, LoginForm } from '~/components/common';
import { UserRoleResponse } from '~/__types';
import { Popup } from '~/components/ui';
import { ApplicationContext } from '~/context/application';
import { queryEndpoints } from '~/services';

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
  const WithRequiredRoleHoc: React.SFC<React.ComponentProps<typeof WrappedComponent>> = props => {
    const { user, userLogout } = React.useContext(ApplicationContext);

    const shouldAuth = showLoginPopup || Array.isArray(authorize);
    const wrappedElement = <WrappedComponent {...props} />;
    if (!shouldAuth) {
      return wrappedElement;
    }
    if (!user.isLoggedIn) {
      return (
        <Popup show shouldRenderCloseIcon={false} hideOverlayClicked={false}>
          <LoginForm />
        </Popup>
      );
    }

    return (
      <Query
        query={queryEndpoints.getAuthUser}
        onError={error => {
          if (error.status === 500) {
            userLogout();
          }
        }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <div>Loading...(withRequiredRole)</div>;
          }
          if (error) {
            return <div>Error (withRequiredRole)</div>;
          }
          if (Array.isArray(authorize) && !authorize.includes(data.role)) {
            return <Redirect to="/" />;
          }

          return wrappedElement;
        }}
      </Query>
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (WithRequiredRoleHoc as any).displayName = `withMouse(${getDisplayName(WrappedComponent)})`;

  return WithRequiredRoleHoc;
};

export { withRequiredRole };
