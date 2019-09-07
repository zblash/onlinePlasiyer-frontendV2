import * as React from 'react';
import { RouteComponentProps, WithRouterProps, WithRouterStatics } from 'react-router';

// TODO : gonderilen componentin propsunu istesin
export default function compose(...funcs) {
  const _funcs = [composeResult];
  _funcs.push(...funcs);

  // @ts-ignore
  return _funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function composeResult<P extends RouteComponentProps<any>, C extends React.ComponentType<P>>(
  component: C & React.ComponentType<P>,
): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>> & WithRouterProps<C>> & WithRouterStatics<C> {
  // @ts-ignore
  return component;
}
