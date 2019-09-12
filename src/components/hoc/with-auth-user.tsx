import * as React from 'react';
import { getDisplayName } from '~/utils';
import { Query } from '~/components/common';
import { ApplicationContext } from '~/context/application';
import { queryEndpoints } from '~/services';
import { UserCommonResponse } from '~/__types';

export interface IWithAuthUserComponentProps {
  user: UserCommonResponse;
  isLoggedIn: boolean;
}

function withAuthUser<P extends IWithAuthUserComponentProps, C extends React.ComponentType<P>>(
  WrappedComponent: C & React.ComponentType<P>,
): React.ComponentClass<Omit<P, keyof IWithAuthUserComponentProps>> {
  const withAuthUserHoc: React.SFC<Omit<P, keyof IWithAuthUserComponentProps>> = props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, userLogout } = React.useContext(ApplicationContext);

    if (!user.isLoggedIn) {
      // @ts-ignore
      return <WrappedComponent {...props} user={null} isLoggedIn={false} />;
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
          if (loading || error) {
            // @ts-ignore
            return <WrappedComponent {...props} user={null} isLoggedIn={false} />;
          }

          // @ts-ignore
          return <WrappedComponent {...props} user={data} isLoggedIn />;
        }}
      </Query>
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (withAuthUserHoc as any).displayName = `withAuthUser(${getDisplayName(WrappedComponent)})`;

  // @ts-ignore
  return withAuthUserHoc;
}

export { withAuthUser };
