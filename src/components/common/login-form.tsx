import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ApplicationContext } from '~/context/application';
import { Mutation } from '.';
import { mutationEndPoints, queryEndpoints } from '~/services';

interface IAppState {
  username: string;
  password: string;
}
type AppProps = {
  onLoggedIn?: Function;
  onError?: (e: any) => void;
} & RouteComponentProps;

class LoginForm extends React.Component<AppProps, IAppState> {
  public static contextType = ApplicationContext;

  public context!: React.ContextType<typeof ApplicationContext>;

  public constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  public render() {
    const {
      onError,
      onLoggedIn,
      history,
      location: { pathname },
    } = this.props;
    const { username, password } = this.state;
    const { userLogin } = this.context;

    return (
      <Mutation
        mutation={mutationEndPoints.login}
        variables={{
          username,
          password,
        }}
        onError={e => {
          if (onError) {
            onError(e);
          }
        }}
        refetchQueries={[
          {
            query: queryEndpoints.getAuthUser,
          },
        ]}
        onComplated={() => {
          userLogin();
          if (onLoggedIn) {
            onLoggedIn();
          }
        }}
      >
        {(login, s) => {
          const { loading } = s;
          const formId = 'login-form';

          return (
            <>
              <form
                id="login-form"
                onSubmit={e => {
                  e.preventDefault();
                  login();
                }}
              />
              <div>
                <label>username :</label>
                <input
                  type="text"
                  form={formId}
                  onChange={e => {
                    this.setState({ username: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>password :</label>
                <input
                  type="password"
                  form={formId}
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </div>
              <button type="submit" form={formId} disabled={!username || password.length < 4 || loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
              {pathname !== '/' && (
                <button
                  type="button"
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Go Home
                </button>
              )}
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(LoginForm);
