export interface RouteSchema {
  id: string;
  props?: {
    [key: string]: RouteSchema | RouteSchema[];
  };
}

export interface ServicesContextProviderComponentState {
  dataCache: Record<string, any>;
  routeCache: Record<
    string,
    {
      usedIds: string[];
      schema: RouteSchema | RouteSchema[];
    }
  >;
}

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type FirstArgument<F extends Function> = ArgumentTypes<F>[0];
type ThenArg<T> = T extends Promise<infer U> ? U : T;

export type EndpointsResultType<F> = F extends (v: any) => Promise<any> ? ThenArg<ReturnType<F>> | null : F;

export type EndpointsVariablesType<F> = F extends Function ? ArgumentTypes<F>[0] : F;
