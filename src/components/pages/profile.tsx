import * as React from 'react';
import { Header } from '~/components/common';

interface AppState {}
interface AppProps {}

class About extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div className="app">
        <Header />
        Profile
      </div>
    );
  }
}

export default About;
