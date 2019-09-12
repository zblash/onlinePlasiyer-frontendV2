import * as React from 'react';
import { Header } from '~/components/common';
import { getDisplayName } from '~/utils';

const withHeader = <T, C>(WrappedComponent: React.ComponentClass<T> | React.FunctionComponent<T>) => {
  const WithRequiredRoleHoc: React.SFC<React.ComponentProps<typeof WrappedComponent>> = props => {
    return (
      <div>
        <Header />
        <WrappedComponent {...props} />
      </div>
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (WithRequiredRoleHoc as any).displayName = `withMouse(${getDisplayName(WrappedComponent)})`;

  return WithRequiredRoleHoc;
};

export { withHeader };
