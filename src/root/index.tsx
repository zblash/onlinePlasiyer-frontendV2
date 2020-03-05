import * as React from 'react';
import { render } from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import { CheckHealth } from '~/controls/check-health';
import { ServicesContextProvider } from '~/services/index';
import App from '~/app/index';
import { main as i18nMain } from '~/i18n/index';
import '~/assets/style';
import AlertTemplate from '~/contexts/alert-template/index';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('tr', tr);
const rootEl = document.getElementById('root');
const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
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
    <AlertProvider template={AlertTemplate} {...options}>
      <CheckHealth>
        <ServicesContextProvider>
          <App />
        </ServicesContextProvider>
      </CheckHealth>
    </AlertProvider>
  </>,
  rootEl,
);
