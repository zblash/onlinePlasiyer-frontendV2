import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { ApplicationContextProvider, CacheContextProvider } from '~/context';
import { getToken } from './services';

// package styles

import '@kenshooui/react-multi-select/dist/style.css';

const rootEl = document.getElementById('root');

render(
  <CacheContextProvider>
    <ApplicationContextProvider isLoggedIn={!!getToken()}>
      <App />
    </ApplicationContextProvider>
  </CacheContextProvider>,
  rootEl,
);
