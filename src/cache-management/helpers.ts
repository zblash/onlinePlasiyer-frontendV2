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

export interface CacheContextActions {
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

// QUERY COMPONENT

export interface QueryComponentProps<T> extends QueryRequiredFields<T> {
  children: (s: { data: EndpointsResultType<T>; loading: boolean; error: Error }) => JSX.Element;
  onComplated?: (data: EndpointsResultType<T>) => void;
  onUpdate?: (data: EndpointsResultType<T>) => void;
  onError?: (e: IQueryError) => void;
  fetchPolicy: FetchPolicy;
  skip?: boolean;
}

export interface QueryComponentState {
  data: any;
  loading: boolean;
  error: Error | null;
}

// MUTATION COMPONENTS

export type MutationFunction<T, TVariables> = (pass?: TVariables) => Promise<T>;

export interface MutationComponentProps<T, TVariables> {
  children: (
    mutation: MutationFunction<T, TVariables>,
    s: { data: T; loading: boolean; error: any; setError: (e: any) => void },
  ) => JSX.Element;
  onError?: (e: any) => void;
  onComplated?: (data: T) => void;
  mutation: MutationFunction<T, TVariables>;
  variables?: TVariables;
  refetchQueries?: GenericQuery[];
}

export interface MutationComponentState<T = any> {
  data: T;
  loading: boolean;
  error: any | null;
}
