import * as React from 'react';

interface AppState {}

class About extends React.Component<{}, AppState> {
  public render() {
    return <div className="app">About</div>;
  }
}

export default About;
