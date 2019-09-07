import * as React from 'react';
import { render } from 'react-dom';
import App from '~/components/app';
import { ApplicationContextProvider } from './components/context';

const rootEl = document.getElementById('root');

render(
  <ApplicationContextProvider>
    <App />
  </ApplicationContextProvider>,
  rootEl,
);
