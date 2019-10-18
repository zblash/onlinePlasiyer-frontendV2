import * as React from 'react';
import deepEqual from 'deep-equal';
import { CacheContext } from '~/context/cache';
import { FetchPolicy } from '~/context/cache/helpers';

interface IQueryError {
  error: string;
  message: string;
  path: string;
  status: 500 | 404;
  timestamp: string;
  trace: string;
}

export interface IQueryRequiredProp<T, TVariables> {
  query: (variables: TVariables) => Promise<T>;
  variables?: TVariables;
}

interface IQueryProps<T, TVariables, ParentQueryVarianbles, ParentQueryResult>
  extends IQueryRequiredProp<T, TVariables> {
  children: (s: { data: T; loading: boolean; error: Error }) => JSX.Element;
  onComplated?: (data: T) => void;
  onUpdate?: (data: T) => void;
  onError?: (e: IQueryError) => void;
  fetchPolicy: FetchPolicy;
  readCache?: {
    parentQuery: (varables: ParentQueryVarianbles) => Promise<ParentQueryResult>;
    parentVariables?: ParentQueryVarianbles;
    dataGetter: (d: ParentQueryResult) => T;
  };
}

interface IQueryState {
  data: any;
  loading: boolean;
  error: Error | null;
}

class Query<T = any, TVars = any, ParentQueryVariables = any, ParentQueryResult = any> extends React.Component<
  IQueryProps<T, TVars, ParentQueryVariables, ParentQueryResult>,
  IQueryState
> {
  public context!: React.ContextType<typeof CacheContext>;

  private _id: string = `${Math.random()}`;

  private _isMounted = false;

  public constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  public componentDidMount() {
    this._isMounted = true;
    this.getQuery();
  }

  public componentDidUpdate(prevProps) {
    const { variables } = this.props;
    if (!deepEqual(prevProps.variables, variables)) {
      this.getQuery();
    }
  }

  public componentWillUnmount() {
    this.setState({ data: null, loading: true, error: null });
    this._isMounted = false;
    const { removeListener } = this.context;
    removeListener(this._id);
  }

  public _safeSetState = data => {
    if (this._isMounted) {
      this.setState(data);
    }
  };

  public getParentData = async () => {
    const { get } = this.context;
    const { onUpdate, readCache } = this.props;
    const { parentQuery, dataGetter, parentVariables } = readCache;

    const parentData: ParentQueryResult = await get({
      query: parentQuery,
      variables: parentVariables,
      fetchPolicy: 'cache-only',
      listener: {
        id: this._id,
        onDataChange: async data => {
          const queryData = dataGetter(data);
          if (queryData) {
            const { error } = this.state;
            if (this._isMounted && onUpdate) {
              onUpdate(queryData);
            }
            this._safeSetState({ data: queryData, error: queryData ? null : error });
          } else {
            // TODO: implement
            throw new Error('query dosyasi duzeltilmeli');
          }
        },
      },
    });

    if (parentData) {
      const queryData = dataGetter(parentData);
      if (queryData) {
        this.setState({ data: queryData, loading: false });

        return queryData;
      }
    }

    return null;
  };

  public getQuery = async () => {
    const { get } = this.context;
    const { query, variables, onError, onComplated, fetchPolicy, onUpdate, readCache } = this.props;

    if (readCache) {
      const cacheData = await this.getParentData();
      if (cacheData) {
        return;
      }
    }
    get({
      query,
      variables,
      listener: {
        id: this._id,
        onDataChange: data => {
          const { error } = this.state;
          if (this._isMounted && onUpdate) {
            onUpdate(data);
          }
          this._safeSetState({ data, error: data ? null : error });
        },
      },
      fetchPolicy,
    })
      .then(data => {
        this._safeSetState({ loading: false, data });
        if (onComplated) {
          onComplated(data);
        }

        if (onUpdate) {
          onUpdate(data);
        }

        return data;
      })
      .catch(_error => {
        const error = _error.response ? _error.response : _error;
        this._safeSetState({ loading: false, error });
        if (onError) {
          onError(error);
        }

        throw error;
      });
  };

  public render() {
    const { children } = this.props;
    const { data, loading, error } = this.state;

    return children({
      data,
      loading,
      error,
    });
  }
}

Query.contextType = CacheContext;

// @ts-ignore
Query.defaultProps = {
  fetchPolicy: 'cache-first',
};

export default Query;
