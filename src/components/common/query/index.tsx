import * as React from 'react';
import deepEqual from 'deep-equal';
import { CacheContext } from '~/context/cache';
import { FetchPolicy } from '~/context/cache/helpers';

interface QueryProps<T, TVariables> {
  children: (s: { data: T; loading: boolean; error: Error }) => JSX.Element;
  onComplated?: (data: T) => void;
  onUpdate?: (data: T) => void;
  onError?: (e: Error) => void;
  variables?: TVariables;
  query: (variables: TVariables) => Promise<T>;
  fetchPolicy: FetchPolicy;
}

interface QueryState {
  data: any;
  loading: boolean;
  error: Error | null;
}

class Query<T = any, TVars = any> extends React.Component<QueryProps<T, TVars>, QueryState> {
  static defaultProps: {
    fetchPolicy: FetchPolicy;
  } = {
    fetchPolicy: 'cache-first',
  };

  static contextType = CacheContext;

  context!: React.ContextType<typeof CacheContext>;

  private _id: string = `${Math.random()}`;

  private _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
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
    this._isMounted = false;
    const { removeListener } = this.context;
    removeListener(this._id);
  }

  _safeSetState = data => {
    if (this._isMounted) {
      this.setState(data);
    }
  };

  getQuery = () => {
    const { get } = this.context;
    const { query, variables, onError, onComplated, fetchPolicy, onUpdate } = this.props;

    return get({
      query,
      variables,
      listener: {
        id: this._id,
        onDataChange: data => {
          if (this._isMounted && onUpdate) {
            onUpdate(data);
          }
          this._safeSetState({ data });
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
      .catch(error => {
        this._safeSetState({ loading: false, error });
        if (onError) {
          onError(error);
        }

        return error;
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

export default Query;
