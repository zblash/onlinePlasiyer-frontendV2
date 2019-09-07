import * as React from 'react';
import services from '~/services';
interface IApplicationContextStates {
  user: {
    isLoggedIn: boolean;
  };
}
interface IApplicationContextActions {
  userLogin: Function;
  userLogout: Function;
}
const initialValue: {
  state: IApplicationContextStates;
  actions: IApplicationContextActions;
} = {
  state: {
    user: {
      isLoggedIn: services.isLoggedIn(),
    },
  },
  actions: {
    userLogin: () => {},
    userLogout: () => {},
  },
};
export const ApplicationContext = React.createContext<
  IApplicationContextStates & IApplicationContextActions
>({ ...initialValue.state, ...initialValue.actions });

class ApplicationContextProvider extends React.Component<
  {},
  IApplicationContextStates
> {
  state: IApplicationContextStates = Object.assign({}, initialValue.state);
  userLogin = () => {
    const { user } = this.state;
    this.setState({ user: { ...user, isLoggedIn: true } });
  };
  userLogout = () => {
    const { user } = this.state;
    this.setState({ user: { ...user, isLoggedIn: false } });
  };
  render() {
    const _state: IApplicationContextStates = JSON.parse(
      JSON.stringify(this.state)
    );
    return (
      <ApplicationContext.Provider
        value={{
          ..._state,
          userLogin: this.userLogin,
          userLogout: this.userLogout,
        }}
      >
        {this.props.children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContextProvider;
