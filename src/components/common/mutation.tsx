import * as React from 'react';
import { CacheContext } from '~/context/cache';

type TMutation<T, TVariables> = (pass?: TVariables) => Promise<T>;
interface MutationProps<T = any, TVariables = any> {
  children: (mutation: TMutation<T, TVariables>, s: { data: T; loading: boolean; error: any }) => JSX.Element;
  onError?: (e: any) => void;
  onComplated?: (data: T) => void;
  mutation: TMutation<T, TVariables>;
  variables?: TVariables;
  refetchQueries?: { query: (vars?: any) => Promise<any>; variables?: any }[];
}
interface MutationState<T = any> {
  data: T;
  loading: boolean;
  error: any | null;
}

export default class Mutation<T = any, TVars = any> extends React.Component<MutationProps<T, TVars>, MutationState<T>> {
  static contextType = CacheContext;

  context!: React.ContextType<typeof CacheContext>;

  private _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  mutate: TMutation<T, TVars> = vars => {
    if (this._isMounted) {
      this.setState({ loading: true });
      const { onError, refetchQueries, onComplated, mutation, variables } = this.props;
      const { mutate } = this.context;

      return mutate({
        mutation,
        refetchQueries,
        variables: variables || vars,
      })
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
          } else {
            throw error;
          }

          return undefined;
        });
    }

    return Promise.resolve({});
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
