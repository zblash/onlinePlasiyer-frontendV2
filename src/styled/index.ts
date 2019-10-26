/* eslint-disable import/no-duplicates,@typescript-eslint/no-explicit-any */
import * as React from 'react';
import _styled, { createGlobalStyle, Keyframes } from 'styled-components';

import { mixins } from './mixins';
import { css } from './css';

export interface StylableProps {
  className?: string;
}

export type ExpressTypes = string | number | ICSSProperties | Keyframes;

interface ICSSProperties {
  [key: string]: string | number | ICSSProperties;
}

type StyledComponent<T> = React.StatelessComponent<T & { as?: React.ReactType }> & IProblemSolver;

type StyledTag<T> = <Props>(
  strings: TemplateStringsArray,
  ...exprs: (ExpressTypes | ((props: Props) => string | number) | IProblemSolver)[]
) => StyledComponent<Props & T>;

type StyledJSXIntrinsics = {
  readonly [P in keyof JSX.IntrinsicElements]: StyledTag<JSX.IntrinsicElements[P]>;
};

type StyledFunction = <T>(c: React.ReactType<T>) => StyledTag<T>;

// @ts-ignore
const styled: StyledJSXIntrinsics &
  StyledFunction & {
    readonly [key: string]: StyledTag<{
      children?: React.ReactNode;
      [key: string]: any;
    }>;
  } = _styled;

export { css, createGlobalStyle, mixins };

export default styled;
