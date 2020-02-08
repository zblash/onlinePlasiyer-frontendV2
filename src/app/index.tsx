import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationContext } from './context';
import Routes from '~/pages';
import { ApplicationProviderProps } from './helpers';
import { PopupContextProvider } from '~/contexts/popup';
import getPermissions from './getPermissions';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { css } from '~/styled';
import { useObjectState } from '~/utils/hooks';
import { IAddressStateResponse } from '~/services/helpers/backend-models';

const opacityLoading = css`
  opacity: 0.7;
`;

function App(props: ApplicationProviderProps) {
  const [loading, setLoading] = React.useState(false);
  const [userState, setUserState] = useObjectState({
    ...props.user,
    isAdmin: props.user.role === 'ADMIN',
    isCustomer: props.user.role === 'CUSTOMER',
    isMerchant: props.user.role === 'MERCHANT',
  });
  const setUserActiveState = React.useCallback(
    (activeState: IAddressStateResponse[]) => {
      setUserState({ activeStates: activeState });
    },
    [setUserState],
  );

  return (
    <BrowserRouter>
      <ApplicationContext.Provider
        value={{
          user: userState,
          permissions: getPermissions(props.user),
          loading: {
            show: () => {
              setLoading(true);
            },
            hide: () => {
              setLoading(false);
            },
          },
          setUserActiveState,
        }}
      >
        <PopupContextProvider>
          <Routes />
          {loading && <FullScreenLoading className={opacityLoading} />}
        </PopupContextProvider>
      </ApplicationContext.Provider>
    </BrowserRouter>
  );
}

export default App;
