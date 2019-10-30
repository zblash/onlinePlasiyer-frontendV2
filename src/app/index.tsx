import * as React from 'react';
import { ApplicationContext, usePopup } from './context';
import Routes from '~/components/pages';
import { USER_ROLE_MAP } from '~/helpers/maps';
import { ApplicationProviderProps } from './helpers';
import { PopupsWrapper } from './popups-wrapper';

function App(props: ApplicationProviderProps) {
  const createCategory = usePopup();
  const updateCategory = usePopup();

  return (
    <ApplicationContext.Provider
      value={{
        user: { ...props.user, role: USER_ROLE_MAP[props.user.role] },
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
