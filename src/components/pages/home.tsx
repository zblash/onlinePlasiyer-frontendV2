import * as React from 'react';
import { hot } from 'react-hot-loader';
import services from '~/services';

const reactLogo = require('~/assets/img/react_logo.svg');
interface AppState {
  counter: number;
}
class Home extends React.Component<{}, AppState> {
  state = {
    counter: 0,
  };
  componentDidMount() {
    console.log(services.getToken());
    services.get('/categories').then(d => {
      console.log(d);
    });
  }
  public render() {
    return (
      <div className='app'>
        <h1>{this.state.counter}</h1>
        <p>Foo aa to aa the barz Yasin Tazoeglu</p>
        <img src={reactLogo} height='480' />
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(Home);
// export default App;
