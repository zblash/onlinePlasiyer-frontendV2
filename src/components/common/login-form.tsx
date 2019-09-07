import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import services from '~/services';
import { Mutation } from '~/components/common';
import { compose } from '~/components/hoc';
import { ApplicationContext } from '../context/application';

interface AppState {
  username: string;
  password: string;
}
type AppProps = {
  onLoggedIn?: Function;
  onError?: (e: any) => void;
} & RouteComponentProps<any>;

class LoginForm extends React.Component<AppProps, AppState> {
  static contextType = ApplicationContext;

  context!: React.ContextType<typeof ApplicationContext>;

  state = {
    username: '',
    password: '',
  };

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
        mutation={() => services.login(this.state.username, this.state.password)}
        onError={e => {
          if (onError) {
            onError(e);
          }
        }}
        onComplated={() => {
          userLogin();
          if (onLoggedIn) {
            onLoggedIn();
          }
        }}
      >
        {(login, { loading }) => {
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

export default compose(withRouter)(LoginForm);
