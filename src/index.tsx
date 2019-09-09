import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { ApplicationContextProvider, CacheContextProvider } from './components/context';
import { getToken } from './components/context/cache/helpers';

const rootEl = document.getElementById('root');

render(
  <CacheContextProvider>
    <ApplicationContextProvider isLoggedIn={!!getToken()}>
      <App />
    </ApplicationContextProvider>
  </CacheContextProvider>,
  rootEl,
);
