import * as React from 'react';
import { ApplicationContext, usePopup } from './context';
import Routes from '~/components/pages';
import { USER_ROLE_MAP } from '~/helpers/maps';
import { ApplicationProviderProps } from './helpers';
import { PopupsWrapper } from './popups-wrapper';
import { TOKEN } from '~/services/utils';

function App(props: ApplicationProviderProps) {
  const createCategory = usePopup();
  const updateCategory = usePopup();

  return (
    <ApplicationContext.Provider
      value={{
        user: { ...props.user, role: USER_ROLE_MAP[props.user.role] },
        userLogout: () => {
          TOKEN.remove();
          // TODO: move to  endpoints context
          // eslint-disable-next-line
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
