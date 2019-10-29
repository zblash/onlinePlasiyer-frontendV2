import * as React from 'react';
import { ApplicationContext, usePopup } from './context';
import Routes from '~/components/pages';
import { USER_ROLE_MAP } from '~/helpers/maps';
import { useLocalStorage } from '~/utils/hooks';
import { ApplicationProviderProps } from './helpers';
import { TOKEN_KEY } from '~/utils/constants';
import { PopupsWrapper } from './popups-wrapper';

function App(props: ApplicationProviderProps) {
  const [token, setToken, removeToken] = useLocalStorage<string>(TOKEN_KEY);
  const createCategory = usePopup();
  const updateCategory = usePopup();

  return (
    <ApplicationContext.Provider
      value={{
        user: { ...props.user, role: USER_ROLE_MAP[props.user.role] },
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
      <Routes />
      <PopupsWrapper createCategory={createCategory} updateCategory={updateCategory} />
    </ApplicationContext.Provider>
  );
}

export default App;
