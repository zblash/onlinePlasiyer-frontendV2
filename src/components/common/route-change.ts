import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const RouteChange = withRouter(({ history }) => {
  useEffect(() => {}, [history.location.key]);
  return null;
});

export default RouteChange;
