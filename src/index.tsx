import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { getToken } from './services';
import { GlobalStyle } from './assets/style';
import { ApplicationContextProvider } from './context/application';
import { CacheContextProvider } from './cache-management/context';

const rootEl = document.getElementById('root');

render(
  <>
    <CacheContextProvider>
      <ApplicationContextProvider isLoggedIn={!!getToken()}>
        <App />
      </ApplicationContextProvider>
    </CacheContextProvider>
    <GlobalStyle />
  </>,
  rootEl,
);
