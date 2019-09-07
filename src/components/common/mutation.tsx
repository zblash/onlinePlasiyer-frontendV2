import * as React from 'react';
type TMutation<T> = (pass?: any) => Promise<T>;
interface MutationProps<T = any> {
  children: (
    mutation: TMutation<T>,
    s: { data: T; loading: boolean; error: Error }
  ) => JSX.Element;
  mutation: TMutation<T>;
  onError?: (e: Error) => void;
  onComplated?: (data: T) => void;
}
interface MutationState<T = any> {
  data: T;
  loading: boolean;
  error: Error | null;
}

export default class Mutation<T = any> extends React.Component<
  MutationProps<T>,
  MutationState<T>
> {
  state = {
    data: null,
    loading: false,
    error: null,
  };
  mutate = (p?: any) => {
    this.setState({ loading: true });
    const { mutation, onError, onComplated } = this.props;
    return mutation(p ? p : undefined)
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
    return children(this.mutate, {
      data,
      loading,
      error,
    });
  }
}
