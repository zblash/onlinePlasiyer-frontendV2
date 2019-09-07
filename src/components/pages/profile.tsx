import * as React from 'react';
import { Header } from '~/components/common';

interface AppState {}
interface AppProps {}
class About extends React.Component<AppProps, AppState> {
  state: AppState = {};
  public render() {
    return (
      <div className='app'>
        <Header />
        Profile
      </div>
    );
  }
}

export default About;
