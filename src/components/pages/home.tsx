import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Header } from '~/components/common';
import JSXStyle from 'styled-jsx/style';

interface AppState {}
class Home extends React.Component<{}, AppState> {
  public render() {
    return (
      <div className='app'>
        <Header />
        <JSXStyle id='yasin'>
          {`
            p {
              color: red;
            }
          `}
        </JSXStyle>
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(Home);
// export default App;
