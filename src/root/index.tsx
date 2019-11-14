import * as React from 'react';
import { render } from 'react-dom';
import { globalStyleCreator } from '~/assets/style';
import { CheckHealth } from '~/controls/check-health';
import { CheckUser } from '~/controls/check-user';
import App from '~/app';
import { ServicesContextProvider } from '~/services';
import '~/i18n';

const rootEl = document.getElementById('root');
const GlobalStyle = globalStyleCreator();

render(
  <>
    <GlobalStyle />
    <CheckHealth>
      <CheckUser
        app={user => (
          <ServicesContextProvider>
            <App user={user} />
          </ServicesContextProvider>
        )}
      />
    </CheckHealth>
  </>,
  rootEl,
);
