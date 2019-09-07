import * as React from 'react';

export default class Query<T = any> extends React.Component<
  {
    children: (s: { data: T; loading: boolean; error: Error }) => JSX.Element;
    query: () => Promise<T>;
    onError?: (e: Error) => void;
    onComplated?: (data: T) => void;
  },
  {
    data: T;
    loading: boolean;
    error: Error | null;
  }
> {
  state = {
    data: null,
    loading: true,
    error: null,
  };
  componentDidMount() {
    this.getQuery();
  }
  getQuery = () => {
    const { query, onError, onComplated } = this.props;
    return query()
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
