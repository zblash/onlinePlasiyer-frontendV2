import * as React from 'react';
interface IApplicationContext {}
const initialValue: IApplicationContext = {};
export const ApplicationContext = React.createContext(initialValue);

class ApplicationContextProvider extends React.Component {
  render() {
    return (
      <ApplicationContext.Provider value={{}}>
        {this.props.children}
      </ApplicationContext.Provider>
    );
  }
}

export default ApplicationContextProvider;
