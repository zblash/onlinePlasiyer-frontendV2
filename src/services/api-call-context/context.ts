import * as React from 'react';
import { ApiCallContextType } from './helpers';

const initialValue: ApiCallContextType = {
  fetch: () => Promise.resolve(),
  fetchIfNotExist: () => Promise.resolve(),
};

const ApiCallContext = React.createContext(initialValue);

function useApiCallContext() {
  return React.useContext(ApiCallContext);
}

export { useApiCallContext, ApiCallContext };
