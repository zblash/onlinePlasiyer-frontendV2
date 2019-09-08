import * as React from 'react';
import deepEqual from 'deep-equal';

interface QueryProps<T, TVars> {
  children: (s: { data: T; loading: boolean; error: Error }) => JSX.Element;
  query: (v?: TVars) => Promise<T>;
  onError?: (e: Error) => void;
  onComplated?: (data: T) => void;
  variables?: TVars;
}
interface QueryState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

class Query<TVars = any, T = any> extends React.Component<QueryProps<T, TVars>, QueryState<T>> {
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
    const { query, variables, onError, onComplated } = this.props;

    return query(variables)
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
