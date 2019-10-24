import * as React from 'react';
import { Header } from '~/components/common/header';
import { getDisplayName } from '~/utils';

const withHeader = <T, C>(WrappedComponent: React.ComponentClass<T> | React.FunctionComponent<T>) => {
  const WithRequiredRoleHoc: React.SFC<React.ComponentProps<typeof WrappedComponent>> = props => (
    <>
      <Header />
      <WrappedComponent {...props} />
    </>
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (WithRequiredRoleHoc as any).displayName = `withHeader(${getDisplayName(WrappedComponent)})`;

  return WithRequiredRoleHoc;
};

export { withHeader };
