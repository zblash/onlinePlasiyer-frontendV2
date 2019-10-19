import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { ApplicationContextProvider, CacheContextProvider } from '~/context';
import { getToken } from './services';

import '@kenshooui/react-multi-select/dist/style.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import '~/assets/scss/app.scss';

import { createGlobalStyle } from './styled';
import { globalStyle } from './styled/css';

const GlobalStyle = createGlobalStyle`${globalStyle()}`;

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
