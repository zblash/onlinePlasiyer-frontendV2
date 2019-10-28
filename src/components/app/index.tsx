import * as React from 'react';
import { useQuery } from '~/cache-management/hooks';
import { getToken, queryEndpoints } from '~/services';
import { ApplicationContextProvider } from './context';
import Routes from '../pages';
import { LoginRegisterPage } from '../pages/login-register';
import { FullScreenLoading } from '../common/full-screen-loading';
const App = () => {
  const [isShowLoading, setisShowLoading] = React.useState(true);
  const [isHealth, loading, error] = useQuery(queryEndpoints.checkHealth);
  const isSkip = !isHealth || !getToken();
  const [user, userLoading, userError] = useQuery(queryEndpoints.getAuthUser, {
    skip: isSkip,
  });

  React.useEffect(() => {
    setTimeout(() => {
      setisShowLoading(false);
    }, 500);
  }, [isHealth]);

  if (error) {
    return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
  }

  if (userLoading || loading || isShowLoading) {
    return <FullScreenLoading />;
  }

  if (userError || !user) {
    return <LoginRegisterPage />;
  }

  return (
    <ApplicationContextProvider user={user}>
      <Routes />
    </ApplicationContextProvider>
  );
};

export default App;
