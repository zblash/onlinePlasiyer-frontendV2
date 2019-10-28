import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { GlobalStyle } from './assets/style';
import { CacheContextProvider } from './cache-management/context';

const rootEl = document.getElementById('root');

render(
  <>
    <CacheContextProvider>
      <App />
    </CacheContextProvider>
    <GlobalStyle />
  </>,
  rootEl,
);
