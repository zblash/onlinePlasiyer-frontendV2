import * as React from 'react';
import deepEqual from 'deep-equal';
import { isArray, getKeyByValue } from '~/utils';
import { cacheHelper, getRouteId, FetchPolicy } from './helpers';
import { queryEndpoints } from '~/services';

type TQuery = (vars: any) => Promise<any>;
type TRefetchQueries = { query: (vars?: any) => Promise<any>; variables?: any }[];

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

export interface ICacheHelperResponse {
  route: IRouteResponse['cache'];
  cache: Record<string, any>;
}

interface IApplicationContextState {
  dataCache: Record<string, any>;
  routeCache: Record<string, IRouteResponse>;
}
interface IApplicationContextActions {
  get: (s: {
    query: TQuery;
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
    refetchQueries?: TRefetchQueries;
  }) => Promise<any>;

  removeListener: (id: string) => void;
}
const initialValue: {
  state: IApplicationContextState;
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

class CacheContextProvider extends React.Component<{}, IApplicationContextState> {
  private _proccessTimer: Record<string, Promise<any>>;

  private _changeListener: Record<string, { listner: (data: any) => void; routeId: string }>;

  public constructor(props) {
    super(props);
    this.state = { ...initialValue.state };
    this._proccessTimer = {};
    this._changeListener = {};
  }

  private getRouteEndpoint = (query: any) => {
    const route = getKeyByValue(queryEndpoints, query);

    if (!queryEndpoints[route]) {
      throw new Error(`Endpoint Bulunamadi ${route}`);
    }

    return route;
  };

  public get: IApplicationContextActions['get'] = props => {
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

      if (hasRouteData && fetchPolicy === 'cache-first') {
        const routeResult = this.getDataByRoute(routeId);

        return Promise.resolve(routeResult);
      }
      const apiCall = () =>
        query(variables)
          .then(data => {
            this._proccessTimer[routeId] = undefined;
            const _state = this.state;
            const { dataCache, routeCache } = _state;
            const _cache = cacheHelper(data);
            if (_cache) {
              this.setState(
                {
                  dataCache: { ...dataCache, ..._cache.cache },
                  routeCache: { ...routeCache, [routeId]: { cache: _cache.route, usedIds: Object.keys(_cache.cache) } },
                },
                () => {
                  this.updateQueries(_cache, _state, listener ? listener.id : '##');
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

  public mutate: IApplicationContextActions['mutate'] = ({ variables, mutation, refetchQueries }) =>
    mutation(variables).then(data => {
      const _state = this.state;
      this.refetchQuerys(refetchQueries).then(() => {
        const _cache = cacheHelper(data);
        if (_cache) {
          this.setState(
            prevState => ({
              dataCache: { ...prevState.dataCache, ..._cache.cache },
            }),
            () => {
              this.updateQueries(_cache, _state);
            },
          );
        }
      });

      return data;
    });

  public refetchQuerys = async (refetchQueries: TRefetchQueries) => {
    if (isArray(refetchQueries)) {
      await Promise.all(
        refetchQueries.map(({ query, variables: refetchVars }) =>
          this.get({ query, variables: refetchVars, fetchPolicy: 'cache-and-network' }),
        ),
      );
    }
  };

  public hasRouteData = (routeId: string) => {
    const { routeCache } = this.state;

    const data = routeCache[routeId];

    return Boolean(data);
  };

  // TODO : refactor code
  public updateQueries = (
    newResponseCache: ICacheHelperResponse,
    oldAppState: IApplicationContextState,
    currentQueryId: string = '##',
  ) => {
    const { routeCache } = this.state;
    Object.keys(this._changeListener).forEach(_queryId => {
      const item = this._changeListener[_queryId];
      const newResponseCacheAllIds = Object.keys(newResponseCache.cache);
      const routeResult = routeCache[item.routeId];
      if (this.hasRouteData(item.routeId) && _queryId !== currentQueryId) {
        const routeUsedIds = routeResult.usedIds;
        const newCacheIdsForQuery = newResponseCacheAllIds.filter(_id => routeUsedIds.includes(_id));
        // TODO: update for optimize
        const isResultEmptyArray = newResponseCacheAllIds.length === 0;
        if (newCacheIdsForQuery.length > 0 || isResultEmptyArray) {
          let hasChangedData = !deepEqual(oldAppState.routeCache[item.routeId], routeResult);
          for (let index = 0; index < newCacheIdsForQuery.length; index += 1) {
            if (hasChangedData) {
              break;
            }
            const _id = newCacheIdsForQuery[index];
            const oldCacheForId = oldAppState.dataCache[_id];
            const newCacheForId = newResponseCache[_id];
            hasChangedData = !deepEqual(newCacheForId, oldCacheForId);
          }
          if (hasChangedData) {
            item.listner(this.getDataByRoute(item.routeId));
          }
        }
      }
    });
  };

  public readCache = _routeCache => {
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

  public getDataByRoute = (routeId: string) => {
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

  public removeListener = id => {
    delete this._changeListener[id];
  };

  public getCacheDataById = id => {
    const { dataCache } = this.state;

    return dataCache[id];
  };

  public render() {
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
