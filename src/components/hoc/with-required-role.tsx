import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getDisplayName } from '~/utils';
import { Query, LoginForm } from '~/components/common';
import services from '~/services';
import { UserCommonResponse, UserRoleResponse } from '~/__types';
import { Popup } from '~/components/ui';
import { ApplicationContext } from '../context/application';

const withRole = (
  WrappedComponent,
  {
    authorize,
    showLoginPopup,
  }: {
    authorize?: UserRoleResponse[];
    showLoginPopup: boolean;
  } = { showLoginPopup: true },
) => {
  class WithRequiredRoleHandler extends React.Component {
    static contextType = ApplicationContext;

    context!: React.ContextType<typeof ApplicationContext>;

    render() {
      const { user } = this.context;
      const shouldAuth = showLoginPopup || Array.isArray(authorize);
      // eslint-disable-next-line
      const wrappedComponent = <WrappedComponent {...this.props} />;
      if (!shouldAuth) {
        return wrappedComponent;
      }
      if (!user.isLoggedIn) {
        return (
          <Popup show shouldRenderCloseIcon={false} hideOverlayClicked={false}>
            <LoginForm
              onLoggedIn={() => {
                location.reload();
              }}
            />
          </Popup>
        );
      }

      return (
        <Query<UserCommonResponse> query={services.getAuthUser}>
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

            return wrappedComponent;
          }}
        </Query>
      );
    }
  }

  (WithRequiredRoleHandler as any).displayName = `withMouse(${getDisplayName(WrappedComponent)})`;

  return WithRequiredRoleHandler;
};

export default withRole;
