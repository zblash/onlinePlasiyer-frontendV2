import React from 'react';
import App from '~/app';
import { LoginRegisterPage } from '~/components/pages/login-register';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { useQuery } from '~/services/context';
import { TOKEN } from '~/services/utils';
import { queryEndpoints } from '~/services/endpoints';

function CheckUser() {
  const isSkip = !TOKEN.get();
  const { data: user, loading: userLoading, error: userError } = useQuery(queryEndpoints.getAuthUser, {
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
