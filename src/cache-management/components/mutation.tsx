import * as React from 'react';
import { CacheContext } from '../context';
import { MutationComponentProps, MutationComponentState, MutationFunction } from '../helpers';

class Mutation<T = any, TVars = any> extends React.Component<
  MutationComponentProps<T, TVars>,
  MutationComponentState<T>
> {
  public context!: React.ContextType<typeof CacheContext>;

  private _isMounted = false;

  public constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null,
    };
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public mutate: MutationFunction<T, TVars> = vars => {
    if (this._isMounted) {
      this.setState({ loading: true, error: null });
      const { onError, refetchQueries, onComplated, mutation, variables } = this.props;
      const { mutate } = this.context;

      return mutate({
        mutation,
        refetchQueries,
        variables: variables || vars,
      })
        .then(data => {
          this.setState({ loading: false, data, error: null });
          if (onComplated) {
            onComplated(data);
          }

          return data;
        })
        .catch(error => {
          this.setState({ loading: false, error });
          if (onError) {
            onError(error);
          } else {
            throw error;
          }

          return undefined;
        });
    }

    return Promise.resolve({});
  };

  public render() {
    const { children, onError } = this.props;
    const { data, loading, error } = this.state;

    return children(this.mutate, {
      data,
      loading,
      error,
      setError: e => {
        this.setState({ error: e });
        if (onError) {
          onError(e);
        }
      },
    });
  }
}
Mutation.contextType = CacheContext;
export default Mutation;