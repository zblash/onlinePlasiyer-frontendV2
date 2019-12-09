import React from 'react';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { ApiCall, hasToken } from '~/services/api';
import { IUserCommonResponse } from '~/services/helpers/backend-models';
import { LoginRegisterPage } from '~/components/common/login-register';

interface Props {
  app: (user: IUserCommonResponse) => React.ReactElement;
}

function CheckUser(props: Props) {
  const [isLoading, setIsLoading] = React.useState(hasToken);
  const [hasError, setHasError] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (hasToken) {
      ApiCall.get('/user/getinfos')
        .then(_user => {
          setUser(_user);
          setIsLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (hasError || !user) {
    return <LoginRegisterPage />;
  }

  return props.app(user);
}

export { CheckUser };
