import * as React from 'react';
import { ApplicationContext, ApplicationProviderProps } from './helpers';
import { usePopup } from './hooks';
import { PopupsWrapper } from './popups-wrapper';
import { useLocalStorage } from '~/utils/hooks';
import { TOKEN_KEY } from '~/utils/constants';

function ApplicationContextProvider(props: React.PropsWithChildren<ApplicationProviderProps>) {
  const [token, setToken, removeToken] = useLocalStorage<string>(TOKEN_KEY);
  const { children } = props;
  const createCategory = usePopup();
  const updateCategory = usePopup();

  return (
    <ApplicationContext.Provider
      value={{
        user: props.user,
        userLogout: () => {
          removeToken();
          location.reload();
        },
        popups: {
          createCategory,
          updateCategory,
        },
      }}
    >
      {children}
      <PopupsWrapper createCategory={createCategory} updateCategory={updateCategory} />
    </ApplicationContext.Provider>
  );
}

export { ApplicationContextProvider, ApplicationContext };
