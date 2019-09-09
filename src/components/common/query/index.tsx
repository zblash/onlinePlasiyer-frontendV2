import * as React from 'react';
import deepEqual from 'deep-equal';
import { CacheContext } from '~/components/context/cache';
import { FetchPolicy, QueryEndpoints } from '~/components/context/cache/helpers';

interface QueryProps<T, TVariables> {
  children: (s: { data: T; loading: boolean; error: Error }) => JSX.Element;
  onComplated?: (data: T) => void;
  onError?: (e: Error) => void;
  variables?: TVariables;
  route: QueryEndpoints;
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

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.getQuery();
  }

  componentDidUpdate(prevProps) {
    const { variables } = this.props;
    if (!deepEqual(prevProps.variables, variables)) {
      this.getQuery();
    }
  }

  getQuery = () => {
    const { get } = this.context;
    const { route, variables, onError, onComplated, fetchPolicy } = this.props;

    return get(route, variables, fetchPolicy)
      .then(data => {
        this.setState({ loading: false, data });
        if (onComplated) {
          onComplated(data);
        }

        return data;
      })
      .catch(error => {
        this.setState({ loading: false, error });
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
