import * as React from 'react';
import { isArray } from '~/utils';
import { cacheHelper, getRouteId, QueryEndpoints, FetchPolicy, queryEndpoints } from './helpers';

interface IApplicationContextStates {
  dataCache: Record<string, any>;
  routeCache: Record<string, string[]>;
}
interface IApplicationContextActions {
  get: (route: QueryEndpoints, vars: any, fetchPolicy: FetchPolicy) => Promise<any>;
}
const initialValue: {
  state: IApplicationContextStates;
  actions: IApplicationContextActions;
} = {
  state: {
    dataCache: {},
    routeCache: {},
  },
  actions: {
    get: () => Promise.resolve(),
  },
};

export const CacheContext = React.createContext<IApplicationContextActions>({
  ...initialValue.state,
  ...initialValue.actions,
});

class CacheContextProvider extends React.Component<{}, IApplicationContextStates> {
  constructor(props) {
    super(props);
    this.state = { ...initialValue.state };
  }

  get: IApplicationContextActions['get'] = (route, variables, fetchPolicy) => {
    if (fetchPolicy === 'cache-first') {
      if (this.hasRouteData(route, variables)) {
        return Promise.resolve(this.getDataByRoute(route, variables));
      }
      if (!queryEndpoints[route]) {
        throw new Error(`Endpoint Bulunamadi ${route}`);
      }

      const apiCall = queryEndpoints[route](variables) as Promise<any>;

      return apiCall.then(data => {
        const { dataCache, routeCache } = this.state;
        const _cache = cacheHelper(data, dataCache);
        if (_cache) {
          this.setState({
            dataCache: _cache.cache,
            routeCache: { ...routeCache, [getRouteId(route, variables)]: _cache.route },
          });
        }

        return data;
      });
    }

    return Promise.resolve({});
  };

  hasRouteData = (route: string, variables: any) => {
    const { routeCache } = this.state;
    const routeId = getRouteId(route, variables);

    const data = routeCache[routeId];

    return Boolean(data);
  };

  readCache = _routeCache => {
    const { dataCache } = this.state;
    const currentItem = dataCache[_routeCache.id];
    if (!currentItem) {
      throw new Error('Cache de boyle birsey yok');
    }

    const resultObjec = JSON.parse(JSON.stringify(currentItem));

    const _props = _routeCache.props || {};
    Object.keys(_props).forEach(prop => {
      const propValue = _props[prop];
      if (isArray(propValue)) {
        const _propArra = [];
        propValue.forEach(childProp => {
          _propArra.push(this.readCache(childProp));
        });
        resultObjec[prop] = _propArra;
      } else {
        resultObjec[prop] = this.readCache(propValue);
      }
    });

    return resultObjec;
  };

  getDataByRoute = (route: string, variables?: Record<string, any>) => {
    const { routeCache } = this.state;
    const routeId = getRouteId(route, variables);

    const data = routeCache[routeId];

    if (!data) {
      throw new Error('Data yok');
    }

    if (isArray(data)) {
      return data.map(routeChildCache => this.readCache(routeChildCache));
    }

    return this.readCache(data);
  };

  render() {
    const { children } = this.props;

    return (
      <CacheContext.Provider
        value={{
          get: this.get,
        }}
      >
        {children}
      </CacheContext.Provider>
    );
  }
}

export default CacheContextProvider;
