import * as React from 'react';
import { Header } from '~/components/common';

interface AppState {}

class Home extends React.Component<{}, AppState> {
  public render() {
    return (
      <div className="app">
        <Header />
      </div>
    );
  }
}

// import { hot } from 'react-hot-loader';
// declare let module: object;
// export default hot(module)(Home);

export default Home;
