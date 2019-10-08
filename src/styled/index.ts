/* eslint-disable import/no-duplicates,@typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';
import { Theme } from './theme';

const {
  default: _styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<Theme>;

interface ICSSProperties {
  [key: string]: string | number | ICSSProperties;
}

type StyledComponent<T> = React.StatelessComponent<T & { as?: React.ReactType }>;

type StyledTag<T> = <Props = T>(
  strings: TemplateStringsArray,
  ...exprs: (string | number | ICSSProperties | ((props: Props) => string | number))[]
) => StyledComponent<Props>;

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

export { css, createGlobalStyle, keyframes, ThemeProvider };

export default styled;
