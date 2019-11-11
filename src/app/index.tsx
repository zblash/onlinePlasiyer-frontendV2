import * as React from 'react';
import { ApplicationContext, usePopup } from './context';
import Routes from '~/components/pages';
import { ApplicationProviderProps } from './helpers';
import { PopupsWrapper } from './popups-wrapper';

function App(props: ApplicationProviderProps) {
  const createCategory = usePopup();
  const updateCategory = usePopup();

  return (
    <ApplicationContext.Provider
      value={{
        user: props.user,
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
