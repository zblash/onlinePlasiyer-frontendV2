/* eslint-disable import/no-duplicates,@typescript-eslint/no-explicit-any */
import * as React from 'react';
import _styled, { createGlobalStyle, keyframes, Keyframes } from 'styled-components';

import { mixins } from './mixins';
import { css } from './css';
import { makeid } from '~/utils';

export interface StylableProps {
  className?: string;
}

export type ExpressTypes = string | number | ICSSProperties | Keyframes | React.SFC<any>;

export interface ICssVariable extends String {
  set: (s: string | number) => string;
  get: () => string;
}

interface ICSSProperties {
  [key: string]: string | number | ICSSProperties;
}

type StyledComponent<T> = React.StatelessComponent<T & { as?: React.ReactType }> & IProblemSolver;

type StyledTag<T> = <Props = T>(
  strings: TemplateStringsArray,
  ...exprs: (ExpressTypes | ((props: Props) => string | number) | IProblemSolver)[]
) => StyledComponent<Props & T>;

type StyledJSXIntrinsics = {
  readonly [P in keyof JSX.IntrinsicElements]: StyledTag<JSX.IntrinsicElements[P]>;
};

// @ts-ignore
const styled: StyledJSXIntrinsics & {
  <T>(component: React.ReactType<T>): StyledTag<T>;

  readonly [key: string]: StyledTag<{
    children?: React.ReactNode;
    [key: string]: any;
  }>;
} = _styled;

function createCssVariable(defaultVal: string | number): ICssVariable {
  const name = makeid(10);
  // eslint-disable-next-line
  css.global`
  html{
    --${name}:${defaultVal} 
  }
  `;

  // eslint-disable-next-line
  const str = new String(`var(--${name})`) as ICssVariable;

  str.set = s => `--${name}:${s}`;
  str.get = () => str.toString();

  return str;
}

export { css, createGlobalStyle, keyframes, mixins, createCssVariable };

export default styled;
