import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { GlobalStyle } from './assets/style';
import { CacheContextProvider } from './cache-management/context';
import { ApplicationContextProvider } from './context/application';

const rootEl = document.getElementById('root');

render(
  <>
    <CacheContextProvider>
      <ApplicationContextProvider>
        <App />
      </ApplicationContextProvider>
    </CacheContextProvider>
    <GlobalStyle />
  </>,
  rootEl,
);
