import React from 'react';
import App from '~/app';
import { LoginRegisterPage } from '~/components/pages/login-register';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { useQuery } from '~/services/context';
import { getToken } from '~/services/utils';
import { queryEndpoints } from '~/services/endpoints';

function CheckUser() {
  const isSkip = !getToken();
  const [user, userLoading, userError] = useQuery(queryEndpoints.getAuthUser, {
    skip: isSkip,
  });

  if (userLoading) {
    return <FullScreenLoading />;
  }

  if (userError || !user) {
    return <LoginRegisterPage />;
  }

  return <App user={user} />;
}

export { CheckUser };
