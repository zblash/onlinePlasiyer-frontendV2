import * as React from 'react';
import deepEqual from 'deep-equal';
import { CacheContext } from '../context';
import { QueryComponentProps, QueryComponentState } from '../helpers';

class Query<T = any, TVars = any> extends React.Component<QueryComponentProps<T, TVars>, QueryComponentState> {
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
    this._safeSetState({ data: null, loading: true, error: null });
    this.isComponentMounted = false;
    const { removeListener } = this.context;
    removeListener(this.componentId);
  }

  _safeSetState = data => {
    if (this.isComponentMounted) {
      this.setState(data);
    }
  };

  getQuery = async () => {
    const { get } = this.context;
    const { query, variables, onError, onComplated, fetchPolicy, onUpdate, skip } = this.props;

    if (!skip) {
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
            this._safeSetState({ data, error: data ? null : error, loading: false });
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
    }
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
