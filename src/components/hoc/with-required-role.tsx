import * as React from 'react';
import { getDisplayName } from '~/utils';
import { Query, LoginForm } from '~/components/common';
import services from '~/services';
import { UserResponse, UserRole } from '~/__types';
import { Popup } from '~/components/ui';
import { Redirect } from 'react-router-dom';
import { ApplicationContext } from '../context/application';
const withRole = (
  WrappedComponent,
  {
    authorize,
    showLoginPopup,
  }: {
    authorize?: UserRole[];
    showLoginPopup: boolean;
  } = { showLoginPopup: true }
) => {
  class WithRequiredRoleHandler extends React.Component {
    static contextType = ApplicationContext;
    context!: React.ContextType<typeof ApplicationContext>;
    render() {
      const shouldAuth = showLoginPopup || Array.isArray(authorize);
      if (!shouldAuth) {
        return <WrappedComponent {...this.props} />;
      }
      if (!this.context.user.isLoggedIn) {
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
        <Query<UserResponse> query={services.getAuthUser}>
          {({ data, loading, error }) => {
            if (loading) {
              return <div>Loading...(withRequiredRole)</div>;
            }
            if (error) {
              console.log(error);
              return <div>Error (withRequiredRole)</div>;
            }
            if (Array.isArray(authorize) && !authorize.includes(data.role)) {
              return <Redirect to='/' />;
            }
            return <WrappedComponent {...this.props} />;
          }}
        </Query>
      );
    }
  }

  (WithRequiredRoleHandler as any).displayName = `withMouse(${getDisplayName(
    WrappedComponent
  )})`;
  return WithRequiredRoleHandler;
};

export default withRole;
