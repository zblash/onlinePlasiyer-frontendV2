import * as React from 'react';
import { render } from 'react-dom';
import { CheckHealth } from './check-health';
import { GlobalStyle } from '~/assets/style';

const rootEl = document.getElementById('root');

render(
  <>
    <CheckHealth />
    <GlobalStyle />
  </>,
  rootEl,
);
