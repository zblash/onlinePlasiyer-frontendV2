import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationContext } from './context';
import Routes from '~/pages';
import { ApplicationProviderProps } from './helpers';
import { PopupContextProvider } from '~/contexts/popup';
import getPermissions from './getPermissions';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { css } from '~/styled';

const opacityLoading = css`
  opacity: 0.7;
`;

function App(props: ApplicationProviderProps) {
  const [loading, setLoading] = React.useState(false);

  return (
    <BrowserRouter>
      <ApplicationContext.Provider
        value={{
          user: props.user,
          permissions: getPermissions(props.user),
          loading: {
            show: () => {
              setLoading(true);
            },
            hide: () => {
              setLoading(false);
            },
          },
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
