// TODO: move to stateless component
import * as React from 'react';
import deepEqual from 'deep-equal';
import { isArray, getKeyByValue } from '~/utils';
import { ServicesContextProviderComponentState, ServicesContextValues, GenericQuery, RouteSchema } from './helpers';
import { getRouteSchema, getRouteId, separatingObjectsContainingId, deepMergeIdObjects } from './utils';
import { ServicesContext } from './context';
import { queryEndpoints } from './endpoints';

class ServicesContextProvider extends React.Component<{}, ServicesContextProviderComponentState> {
  queryQeue: Record<string, Promise<any>>;

  changeListener: Record<string, { listner: (data: any) => void; routeId: string }>;

  constructor(props) {
    super(props);
    this.state = { dataCache: {}, routeCache: {} };
    this.queryQeue = {};
    this.changeListener = {};
  }

  getRouteEndpoint = (query: any) => {
    const route = getKeyByValue(queryEndpoints, query);

    if (!queryEndpoints[route]) {
      throw new Error(`Endpoint Bulunamadi ${route}`);
    }

    return route;
  };

  get: ServicesContextValues['get'] = props => {
    const { query, variables, listener, fetchPolicy } = props;
    const routeId = getRouteId(this.getRouteEndpoint(query), variables);
    if (fetchPolicy === 'cache-first' || fetchPolicy === 'cache-and-network') {
      const hasRouteData = this.hasRouteData(routeId);

      if (listener) {
        this.changeListener[listener.id] = { routeId, listner: listener.onDataChange };
      }

      if (hasRouteData && fetchPolicy === 'cache-first') {
        const routeResult = this.getDataByRoute(routeId);

        return Promise.resolve(routeResult);
      }
      const apiCall = () =>
        query(variables)
          .then(data => {
            this.queryQeue[routeId] = undefined;
            const _state = this.state;
            const { dataCache, routeCache } = _state;
            const routeSchema = getRouteSchema(data);
            const modifiedObjects = deepMergeIdObjects(dataCache, separatingObjectsContainingId(data));

            if (routeSchema && modifiedObjects) {
              this.setState(
                {
                  dataCache: { ...dataCache, ...modifiedObjects },
                  routeCache: {
                    ...routeCache,
                    [routeId]: { schema: routeSchema, usedIds: Object.keys(modifiedObjects) },
                  },
                },
                () => {
                  this.updateQueries(
                    {
                      route: routeSchema,
                      cache: modifiedObjects,
                    },
                    _state,
                    listener ? listener.id : '##',
                  );
                },
              );
            }

            return data;
          })
          .finally(() => {
            this.queryQeue[routeId] = undefined;
          });

      if (!this.queryQeue[routeId]) {
        this.queryQeue[routeId] = apiCall();
      } else {
        this.queryQeue[routeId].then(() => this.get(props));
      }

      return this.queryQeue[routeId];
    }

    return query(variables);
  };

  mutate: ServicesContextValues['mutate'] = ({ variables, mutation, refetchQueries }) =>
    mutation(variables).then(data => {
      const _state = this.state;
      const _cache = getRouteSchema(data);
      const modifiedObjects = separatingObjectsContainingId(data);
      this.refetchQueries(refetchQueries).then(() => {
        if (_cache) {
          this.setState(
            prevState => ({
              dataCache: { ...prevState.dataCache, ...modifiedObjects },
            }),
            () => {
              this.updateQueries(
                {
                  route: _cache,
                  cache: modifiedObjects,
                },
                _state,
              );
            },
          );
        }
      });

      return data;
    });

  refetchQueries = async (refetchQueries: GenericQuery[]) => {
    if (isArray(refetchQueries)) {
      return await Promise.all(
        refetchQueries.map(({ query, variables: refetchVars }) =>
          this.get({ query, variables: refetchVars, fetchPolicy: 'cache-and-network' }),
        ),
      );
    }

    return [];
  };

  hasRouteData = (routeId: string) => {
    const { routeCache } = this.state;

    const data = routeCache[routeId];

    return Boolean(data);
  };

  // TODO : refactor code
  updateQueries = (
    newResponseCache: { route: RouteSchema | RouteSchema[]; cache: Record<string, any> },
    oldAppState: ServicesContextProviderComponentState,
    currentQueryId = '##',
  ) => {
    const { routeCache } = this.state;
    Object.keys(this.changeListener).forEach(_queryId => {
      const queryListener = this.changeListener[_queryId];
      const newResponseCacheAllIds = Object.keys(newResponseCache.cache);
      const routeResult = routeCache[queryListener.routeId];
      if (this.hasRouteData(queryListener.routeId) && _queryId !== currentQueryId) {
        const routeUsedIds = routeResult.usedIds;
        const newCacheIdsForQuery = newResponseCacheAllIds.filter(_id => routeUsedIds.includes(_id));
        // TODO: update for optimize
        const isResultEmptyArray = newResponseCacheAllIds.length === 0;
        if (newCacheIdsForQuery.length > 0 || isResultEmptyArray) {
          let hasChangedData = !deepEqual(oldAppState.routeCache[queryListener.routeId], routeResult);
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
            queryListener.listner(this.getDataByRoute(queryListener.routeId));
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

    const data = routeCache[routeId].schema;

    if (!data) {
      throw new Error('Data yok');
    }

    if (Array.isArray(data)) {
      return data.map(routeChildCache => this.readCache(routeChildCache));
    }

    return this.readCache(data);
  };

  removeListener = id => {
    delete this.changeListener[id];
  };

  getCacheDataById = id => {
    const { dataCache } = this.state;

    return dataCache[id];
  };

  render() {
    const { children } = this.props;

    return (
      <ServicesContext.Provider
        value={{
          get: this.get,
          mutate: this.mutate,
          removeListener: this.removeListener,
        }}
      >
        {children}
      </ServicesContext.Provider>
    );
  }
}

export { ServicesContextProvider };
