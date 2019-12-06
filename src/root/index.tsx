import * as React from 'react';
import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { globalStyleCreator } from '~/styled';
import { CheckHealth } from '~/controls/check-health';
import { CheckUser } from '~/controls/check-user';
import { ServicesContextProvider } from '~/services';
import App from '~/app';
import { main as i18nMain } from '~/i18n';
import '~/assets/style';
import AlertTemplate from '~/contexts/alert-template';

const rootEl = document.getElementById('root');
const GlobalStyle = globalStyleCreator();
const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 300,
  offset: '10px',
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 100,
    width: 500,
  },
};
i18nMain();

render(
  <>
    <GlobalStyle />
    <AlertProvider template={AlertTemplate} {...options}>
      <CheckHealth>
        <CheckUser
          app={user => (
            <ServicesContextProvider>
              <App user={user} />
            </ServicesContextProvider>
          )}
        />
      </CheckHealth>
    </AlertProvider>
  </>,
  rootEl,
);
