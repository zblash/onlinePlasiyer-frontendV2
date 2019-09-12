import * as React from 'react';

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
      isLoggedIn: false,
    },
  },
  actions: {
    userLogin: () => {},
    userLogout: () => {},
  },
};

interface IApplicationProviderProps {
  isLoggedIn: boolean;
}

export const ApplicationContext = React.createContext<IApplicationContextStates & IApplicationContextActions>({
  ...initialValue.state,
  ...initialValue.actions,
});

class ApplicationContextProvider extends React.Component<IApplicationProviderProps, IApplicationContextStates> {
  public constructor(props: IApplicationProviderProps) {
    super(props);

    this.state = {
      ...initialValue.state,
      user: {
        ...initialValue.state.user,
        isLoggedIn: props.isLoggedIn,
      },
    };
  }

  public userLogin = () => {
    const { user } = this.state;
    this.setState({ user: { ...user, isLoggedIn: true } });
  };

  public userLogout = () => {
    const { user } = this.state;
    this.setState({ user: { ...user, isLoggedIn: false } });
    localStorage.removeItem('_auth');
  };

  public render() {
    const { children } = this.props;

    return (
      <ApplicationContext.Provider
        value={{
          ...this.state,
          userLogin: this.userLogin,
          userLogout: this.userLogout,
        }}
      >
        {children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContextProvider;
