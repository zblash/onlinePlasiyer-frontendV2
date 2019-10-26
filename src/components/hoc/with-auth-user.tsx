import * as React from 'react';
import { getDisplayName } from '~/utils';
import { ApplicationContext } from '~/context/application';
import { queryEndpoints } from '~/services';
import { IUserCommonResponse } from '~/backend-model-helpers';
import { useQuery } from '~/cache-management/hooks';

export interface WithAuthUserComponentProps {
  user: IUserCommonResponse;
  isLoggedIn: boolean;
  isUserLoading: boolean;
}

function withAuthUser<P extends WithAuthUserComponentProps, C extends React.ComponentType<P>>(
  WrappedComponent: C & React.ComponentType<P>,
):
  | React.ComponentClass<Omit<P, keyof WithAuthUserComponentProps>>
  | React.SFC<Omit<P, keyof WithAuthUserComponentProps>> {
  const withAuthUserHoc: React.SFC<Omit<P, keyof WithAuthUserComponentProps>> = props => {
    const { user, userLogout } = React.useContext(ApplicationContext);

    if (!user.isLoggedIn) {
      // @ts-ignore
      return <WrappedComponent {...props} user={null} isLoggedIn={false} />;
    }
    const [data, loading, error] = useQuery(queryEndpoints.getAuthUser, {
      onError: error => {
        userLogout();
      },
    });

    if (loading) {
      // @ts-ignore
      return <WrappedComponent {...props} user={null} isLoggedIn={false} isUserLoading />;
    }
    if (error) {
      // @ts-ignore
      return <WrappedComponent {...props} user={null} isLoggedIn={false} isUserLoading={false} />;
    }

    // @ts-ignore
    return <WrappedComponent {...props} user={data} isLoggedIn isUserLoading={false} />;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (withAuthUserHoc as any).displayName = `withAuthUser(${getDisplayName(WrappedComponent)})`;

  // @ts-ignore
  return withAuthUserHoc;
}

export { withAuthUser };
