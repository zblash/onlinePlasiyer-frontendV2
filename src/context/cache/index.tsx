import * as React from 'react';
import deepEqual from 'deep-equal';
import { isArray, getKeyByValue } from '~/utils';
import { cacheHelper, getRouteId, FetchPolicy } from './helpers';
import { queryEndpoints } from '~/services';

export interface IRouteCache {
  id: string;
  props?: {
    [key: string]: IRouteCache | IRouteCache[];
  };
}

export interface IRouteResponse {
  usedIds: string[];
  cache: IRouteCache | IRouteCache[];
}

export interface CacheHelperResponse {
  route: IRouteResponse['cache'];
  cache: Record<string, any>;
}

interface IApplicationContextStates {
  dataCache: Record<string, any>;
  routeCache: Record<string, IRouteResponse>;
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
                  routeCache: { ...routeCache, [routeId]: { cache: _cache.route, usedIds: Object.keys(_cache.cache) } },
                },
                () => {
                  this.updateQueries(_cache.cache, dataCache, listener ? listener.id : '##');
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
              this.updateQueries(_cache.cache, dataCache);
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

  // TODO : refactor code
  updateQueries = (
    newResponseCache: CacheHelperResponse['cache'],
    oldAppCache: CacheHelperResponse['cache'],
    currentQueryId: string = '##',
  ) => {
    const { routeCache } = this.state;
    Object.keys(this._changeListener).forEach(_queryId => {
      const item = this._changeListener[_queryId];
      const updatedIds = Object.keys(newResponseCache);
      const routeResult = routeCache[item.routeId];
      if (this.hasRouteData(item.routeId) && routeResult && _queryId !== currentQueryId) {
        const routeIds = routeResult.usedIds;
        const newCacheIdsForQuery = updatedIds.filter(_id => routeIds.includes(_id));
        if (newCacheIdsForQuery.length > 0) {
          let hasChangedData = false;
          for (let index = 0; index < newCacheIdsForQuery.length; index += 1) {
            const _id = newCacheIdsForQuery[index];
            const oldCacheForId = oldAppCache[_id];
            const newCacheForId = newResponseCache[_id];
            hasChangedData = !deepEqual(newCacheForId, oldCacheForId);
            if (hasChangedData) {
              break;
            }
          }
          if (hasChangedData) {
            item.listner(this.getDataByRoute(item.routeId));
          }
        }
      }
    });
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

    const data = routeCache[routeId].cache;

    if (!data) {
      throw new Error('Data yok');
    }

    if (Array.isArray(data)) {
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
