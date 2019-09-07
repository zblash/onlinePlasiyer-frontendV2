import * as React from 'react';
import services from '~/services';
import { Mutation } from '~/components/common';
import { RouteComponentProps } from 'react-router-dom';
import { UserRoleKey } from '~/__types';
import { ROLE_MAP } from '~/utils/constants';
interface AppState {
  city: string;
  details: string;
  email: string;
  name: string;
  password: string;
  role: UserRoleKey;
  state: string;
  taxNumber: string;
  username: string;
}
type AppProps = {
  onSignup?: Function;
  onError?: (e: any) => void;
};

class SignUp extends React.Component<AppProps, AppState> {
  state: AppState = {
    city: '',
    details: '',
    email: '',
    name: '',
    role: 'admin',
    state: '',
    taxNumber: '',
    username: '',
    password: '',
  };
  public render() {
    const { onSignup, onError } = this.props;
    const {
      city,
      details,
      password,
      email,
      name,
      role,
      state,
      taxNumber,
      username,
    } = this.state;
    return (
      <div>
        <div>
          <label>Name :</label>
          <input
            type='text'
            value={name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Username :</label>
          <input
            type='text'
            value={username}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Email :</label>
          <input
            type='text'
            value={email}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type='password'
            value={password}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
        </div>
        <div>
          <label>role :</label>
          <select
            onChange={e =>
              this.setState({ role: e.target.value as UserRoleKey })
            }
            defaultValue={role}
          >
            {Object.keys(ROLE_MAP).map(_role => (
              <option value={_role} key={_role}>
                {_role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>City :</label>
          <input
            type='text'
            value={city}
            onChange={e => {
              this.setState({ city: e.target.value });
            }}
          />
        </div>

        <div>
          <label>State :</label>
          <input
            type='text'
            value={state}
            onChange={e => {
              this.setState({ state: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Tax Number :</label>
          <input
            type='text'
            value={taxNumber}
            onChange={e => {
              this.setState({ taxNumber: e.target.value });
            }}
          />
        </div>

        <div>
          <label>Details :</label>
          <textarea
            value={details}
            onChange={e => {
              this.setState({ details: e.target.value });
            }}
          />
        </div>
        <Mutation
          mutation={() => services.signup(this.state)}
          onError={e => {
            if (onError) {
              onError(e);
            }
          }}
          onComplated={() => {
            if (onSignup) {
              onSignup();
            }
          }}
        >
          {(login, { loading }) => {
            if (loading) {
              return <button disabled>...Loading...</button>;
            }
            return (
              <button
                disabled={
                  !city ||
                  !details ||
                  !password ||
                  !email ||
                  !name ||
                  !role ||
                  !state ||
                  !taxNumber ||
                  !username
                }
                onClick={login}
              >
                Signup
              </button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default SignUp;
