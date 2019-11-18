import * as React from 'react';
import axios from 'axios';
import { FullScreenLoading } from '~/components/common/full-screen-loading';
import { URL } from '../services/api';

function CheckHealth(props: React.PropsWithChildren<any>) {
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

  return props.children;
}

export { CheckHealth };
