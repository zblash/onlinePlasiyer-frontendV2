import React from 'react';
import App from '~/app';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { ApiCall } from '~/services/api';
import { ServicesContextProvider } from '~/services';
import { LoginRegisterPage } from './login-register';

function CheckUser() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    ApiCall.get('/users/getmyinfos')
      .then(user => {
        setUser(user);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (hasError || !user) {
    return <LoginRegisterPage />;
  }

  return (
    <ServicesContextProvider>
      <App user={user} />
    </ServicesContextProvider>
  );
}

export { CheckUser };
