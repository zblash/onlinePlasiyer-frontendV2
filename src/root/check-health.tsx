import * as React from 'react';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { ServicesContextProvider } from '~/services';
import { CheckUser } from './check-user';
import { checkHealthEnpoint } from '~/services/endpoints';

function CheckHealth() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    checkHealthEnpoint()
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
    // TODO:update this element
    return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
  }

  return (
    <ServicesContextProvider>
      <CheckUser />
    </ServicesContextProvider>
  );
}

export { CheckHealth };
