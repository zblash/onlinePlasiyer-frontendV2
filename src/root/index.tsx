import * as React from 'react';
import { render } from 'react-dom';
import { globalStyleCreator } from '~/styled';
import { CheckHealth } from '~/controls/check-health';
import { CheckUser } from '~/controls/check-user';
import { ServicesContextProvider } from '~/services';
import App from '~/app';
import { main as i18nMain } from '~/i18n';
import '~/assets/style';

const rootEl = document.getElementById('root');
const GlobalStyle = globalStyleCreator();

i18nMain();

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
