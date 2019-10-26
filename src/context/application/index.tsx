import * as React from 'react';
import { ApplicationContext, ApplicationProviderProps } from './helpers';
import { usePopup } from './hooks';
import { PopupsWrapper } from './popups-wrapper';
import { useLocalStorage } from '~/utils/hooks';
import { TOKEN_KEY } from '~/utils/constants';

function ApplicationContextProvider(props: React.PropsWithChildren<ApplicationProviderProps>) {
  const [token, setToken, removeToken] = useLocalStorage<string>(TOKEN_KEY);
  const { children } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(!!token);
  const createCategory = usePopup();

  return (
    <ApplicationContext.Provider
      value={{
        user: {
          isLoggedIn: isUserLoggedIn,
        },
        userLogin: () => setIsUserLoggedIn(true),
        userLogout: () => {
          setIsUserLoggedIn(false);
          removeToken();
        },
        popups: {
          createCategory,
        },
      }}
    >
      {children}
      <PopupsWrapper createCategory={createCategory} />
    </ApplicationContext.Provider>
  );
}

export { ApplicationContextProvider, ApplicationContext };
