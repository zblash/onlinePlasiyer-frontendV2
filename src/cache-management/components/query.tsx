import * as React from 'react';
import deepEqual from 'deep-equal';
import { CacheContext } from '../context';
import { QueryComponentProps, QueryComponentState } from '../helpers';

class Query<T = any, TVars = any, ParentQueryVariables = any, ParentQueryResult = any> extends React.Component<
  QueryComponentProps<T, TVars, ParentQueryVariables, ParentQueryResult>,
  QueryComponentState
> {
  static defaultProps = {
    fetchPolicy: 'cache-first',
  };
  context!: React.ContextType<typeof CacheContext>;

  componentId = `${Math.random()}`;

  isComponentMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.getQuery();
  }

  componentDidUpdate(prevProps) {
    const { variables } = this.props;
    if (!deepEqual(prevProps.variables, variables)) {
      this.getQuery();
    }
  }

  componentWillUnmount() {
    this.setState({ data: null, loading: true, error: null });
    this.isComponentMounted = false;
    const { removeListener } = this.context;
    removeListener(this.componentId);
  }

  _safeSetState = data => {
    if (this.isComponentMounted) {
      this.setState(data);
    }
  };

  getParentData = async () => {
    const { get } = this.context;
    const { onUpdate, readCache } = this.props;
    const { parentQuery, dataGetter, parentVariables } = readCache;

    const parentData: ParentQueryResult = await get({
      query: parentQuery,
      variables: parentVariables,
      fetchPolicy: 'cache-only',
      listener: {
        id: this.componentId,
        onDataChange: async data => {
          const queryData = dataGetter(data);
          if (queryData) {
            const { error } = this.state;
            if (this.isComponentMounted && onUpdate) {
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

  getQuery = async () => {
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
      variables: variables || {},
      listener: {
        id: this.componentId,
        onDataChange: data => {
          const { error } = this.state;
          if (this.isComponentMounted && onUpdate) {
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

  render() {
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

export { Query };
