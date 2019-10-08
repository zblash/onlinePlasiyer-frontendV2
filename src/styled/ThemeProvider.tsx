import * as React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from '~/styled';
import theme from './theme';

const ThemeProvider: React.SFC<{}> = props => (
  <StyledComponentsThemeProvider theme={{ ...theme }}>
    <>{props.children}</>
  </StyledComponentsThemeProvider>
);

export default ThemeProvider;
