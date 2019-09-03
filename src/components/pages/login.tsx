import * as React from 'react';
import services from '~/services';

interface AppState {
  username: string;
  password: string;
}
class Login extends React.Component<{}, AppState> {
  state = {
    username: '',
    password: '',
  };
  public render() {
    return (
      <div className='app'>
        <input
          type='text'
          onChange={e => {
            this.setState({ username: e.target.value });
          }}
        />
        <br />
        <input
          type='password'
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <br />
        <button
          onClick={() => {
            services.login(this.state.username, this.state.password);
          }}
        >
          Login
        </button>
      </div>
    );
  }
}

export default Login;
