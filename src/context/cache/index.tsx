import * as React from 'react';
import { isArray, getKeyByValue } from '~/utils';
import { cacheHelper, getRouteId, FetchPolicy } from './helpers';
import { queryEndpoints } from '~/services';

interface IApplicationContextStates {
  dataCache: Record<string, any>;
  routeCache: Record<string, string[]>;
}
interface IApplicationContextActions {
  get: (s: {
    query: (vars: any) => Promise<any>;
    variables: any;
    fetchPolicy: FetchPolicy;
    listener?: {
      id: string;
      onDataChange: (data: any) => void;
    };
  }) => Promise<any>;

  mutate: (s: {
    mutation: (vars: any) => Promise<any>;
    variables: any;
    refetchQueries?: { query: (vars?: any) => Promise<any>; variables?: any }[];
  }) => Promise<any>;

  removeListener: (id: string) => void;
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
    mutate: () => Promise.resolve(),
    removeListener: () => {},
  },
};

export const CacheContext = React.createContext<IApplicationContextActions>({
  ...initialValue.state,
  ...initialValue.actions,
});

class CacheContextProvider extends React.Component<{}, IApplicationContextStates> {
  private _proccessTimer: Record<string, Promise<any>>;

  private _changeListener: Record<string, { listner: (data: any) => void; routeId: string }>;

  constructor(props) {
    super(props);
    this.state = { ...initialValue.state };
    this._proccessTimer = {};
    this._changeListener = {};
  }

  getRouteEndpoint = (query: any) => {
    const route = getKeyByValue(queryEndpoints, query);

    if (!queryEndpoints[route]) {
      throw new Error(`Endpoint Bulunamadi ${route}`);
    }

    return route;
  };

  get: IApplicationContextActions['get'] = props => {
    const { query, variables, listener, fetchPolicy } = props;
    const routeId = getRouteId(this.getRouteEndpoint(query), variables);
    if (fetchPolicy === 'cache-only' || fetchPolicy === 'cache-first' || fetchPolicy === 'cache-and-network') {
      const hasRouteData = this.hasRouteData(routeId);
      if (fetchPolicy === 'cache-only') {
        return Promise.resolve(hasRouteData ? this.getDataByRoute(routeId) : null);
      }
      if (listener) {
        this._changeListener[listener.id] = { routeId, listner: listener.onDataChange };
      }

      if (this.hasRouteData(routeId) && fetchPolicy === 'cache-first') {
        return Promise.resolve(this.getDataByRoute(routeId));
      }

      const apiCall = () =>
        query(variables)
          .then(data => {
            this._proccessTimer[routeId] = undefined;
            const { dataCache, routeCache } = this.state;
            const _cache = cacheHelper(data);
            if (_cache) {
              this.setState(
                {
                  dataCache: { ...dataCache, ..._cache.cache },
                  routeCache: { ...routeCache, [routeId]: _cache.route },
                },
                () => {
                  Object.keys(this._changeListener).forEach(key => {
                    const item = this._changeListener[key];
                    if (this.hasRouteData(item.routeId)) {
                      item.listner(this.getDataByRoute(item.routeId));
                    }
                  });
                },
              );
            }

            return data;
          })
          .finally(() => {
            this._proccessTimer[routeId] = undefined;
          });

      if (!this._proccessTimer[routeId]) {
        this._proccessTimer[routeId] = apiCall();
      } else {
        this._proccessTimer[routeId].then(() => this.get(props));
      }

      return this._proccessTimer[routeId];
    }

    return query(variables);
  };

  mutate: IApplicationContextActions['mutate'] = ({ variables, mutation, refetchQueries }) =>
    mutation(variables).then(data => {
      let queryWait: Promise<any> = Promise.resolve('');
      if (isArray(refetchQueries)) {
        queryWait = Promise.all(
          refetchQueries.map(({ query, variables: refetchVars }) =>
            this.get({ query, variables: refetchVars, fetchPolicy: 'cache-and-network' }),
          ),
        );
      }
      queryWait.then(() => {
        const { dataCache } = this.state;
        const _cache = cacheHelper(data);
        if (_cache) {
          this.setState(
            {
              dataCache: { ...dataCache, ..._cache.cache },
            },
            () => {
              Object.keys(this._changeListener).forEach(key => {
                const item = this._changeListener[key];
                if (this.hasRouteData(item.routeId)) {
                  item.listner(this.getDataByRoute(item.routeId));
                }
              });
            },
          );
        }
      });

      return data;
    });

  hasRouteData = (routeId: string) => {
    const { routeCache } = this.state;

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

  getDataByRoute = (routeId: string) => {
    const { routeCache } = this.state;

    const data = routeCache[routeId];

    if (!data) {
      throw new Error('Data yok');
    }

    if (isArray(data)) {
      return data.map(routeChildCache => this.readCache(routeChildCache));
    }

    return this.readCache(data);
  };

  removeListener = id => {
    delete this._changeListener[id];
  };

  render() {
    const { children } = this.props;

    return (
      <CacheContext.Provider
        value={{
          get: this.get,
          mutate: this.mutate,
          removeListener: this.removeListener,
        }}
      >
        {children}
      </CacheContext.Provider>
    );
  }
}

export default CacheContextProvider;
