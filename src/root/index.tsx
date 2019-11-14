import * as React from 'react';
import { render } from 'react-dom';
import { CheckHealth } from '~/controls/check-health';
import { CheckUser } from '~/controls/check-user';
import { GlobalStyle } from '~/assets/style';
import { ServicesContextProvider } from '~/services';
import App from '~/app';
import '~/i18n';

const rootEl = document.getElementById('root');

render(
  <>
    <CheckHealth>
      <CheckUser
        app={user => (
          <ServicesContextProvider>
            <App user={user} />
          </ServicesContextProvider>
        )}
      />
    </CheckHealth>
    <GlobalStyle />
  </>,
  rootEl,
);
