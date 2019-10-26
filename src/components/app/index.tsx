import * as React from 'react';
import { queryEndpoints } from '~/services';
import { FullScreenLoading } from '../common/full-screen-loading';
import Routes from './routes';
import { useQuery } from '~/cache-management/hooks';

const App = () => {
  const [_, loading, error] = useQuery(queryEndpoints.checkHealth);

  if (loading) {
    return <FullScreenLoading />;
  }

  if (error) {
    return <h1>Baglanti Gerceklestiremedik en kisa surede duzelecek</h1>;
  }

  return <Routes />;
};

export default App;
