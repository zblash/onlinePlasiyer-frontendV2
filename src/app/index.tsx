import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationContext } from './context';
import Routes from '~/pages';
import { ApplicationProviderProps } from './helpers';
import { PopupContextProvider } from '~/contexts/popup';
import getPermissions from './getPermissions';

function App(props: ApplicationProviderProps) {
  return (
    <BrowserRouter>
      <ApplicationContext.Provider
        value={{
          user: props.user,
          permissions: getPermissions(props.user),
        }}
      >
        <PopupContextProvider>
          <Routes />
        </PopupContextProvider>
      </ApplicationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
