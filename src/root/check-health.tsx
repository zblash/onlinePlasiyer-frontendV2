import * as React from 'react';
import axios from 'axios';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { CheckUser } from './check-user';
import { URL, hasToken } from '../services/api';
import { LoginRegisterPage } from './login-register';

function CheckHealth() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);

    axios
      .get(URL.concat('/health'))
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (hasError) {
    return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
  }

  if (!hasToken) {
    return <LoginRegisterPage />;
  }

  return <CheckUser />;
}

export { CheckHealth };
