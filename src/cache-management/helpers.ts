/* eslint-disable @typescript-eslint/no-explicit-any */

export type FetchPolicy = 'cache-first' | 'cache-and-network' | 'network-only';

export type GenericQuery = QueryRequiredFields<any>;

export interface RouteSchema {
  id: string;
  props?: {
    [key: string]: RouteSchema | RouteSchema[];
  };
}

export interface CacheContextProviderComponentState {
  dataCache: Record<string, any>;
  routeCache: Record<
    string,
    {
      usedIds: string[];
      schema: RouteSchema | RouteSchema[];
    }
  >;
}

export interface CacheContext {
  get: (s: {
    query: GenericQuery['query'];
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
    refetchQueries?: GenericQuery[];
  }) => Promise<any>;

  removeListener: (id: string) => void;
}

interface IQueryError {
  error: string;
  message: string;
  path: string;
  status: 500 | 404;
  timestamp: string;
  trace: string;
}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type ThenArg<T> = T extends Promise<infer U> ? U : T;

export type EndpointsResultType<F> = F extends (v: any) => Promise<any> ? ThenArg<ReturnType<F>> | null : F;

export type EndpointsVariablesType<F> = F extends Function ? ArgumentTypes<F>[0] : F;

interface QueryRequiredFields<T> {
  query: T;
  variables?: EndpointsVariablesType<T>;
}

export type CommonEnpointOptions<T> = EndpointsVariablesType<T> extends undefined
  ? {
      variables?: EndpointsVariablesType<T>;
    }
  : {
      variables: EndpointsVariablesType<T>;
    };
