/* eslint @typescript-eslint/no-explicit-any : 0 */
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// TODO : gonderilen componentin propsunu istesin
export default function compose(...funcs) {
  const _funcs = [composeResult];
  _funcs.push(...funcs);

  // @ts-ignore
  return _funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export type WithRouterProps<C extends React.ComponentType<any>> = C extends React.ComponentClass
  ? { wrappedComponentRef?: React.Ref<InstanceType<C>> }
  : {};

export interface IWithRouterStatics<C extends React.ComponentType<any>> {
  WrappedComponent: C;
}

function composeResult<P extends RouteComponentProps<any>, C extends React.ComponentType<P>>(
  component: C & React.ComponentType<P>,
): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>> & WithRouterProps<C>> & IWithRouterStatics<C> {
  // @ts-ignore
  return component;
}
